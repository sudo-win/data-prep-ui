import pandas as pd
import sys
import json
from sklearn.preprocessing import LabelEncoder

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

transform_json = sys.argv[1]
file_path = sys.argv[2]

def encode_df(dataframe,encode):
    le = LabelEncoder()
    for column in encode:
        dataframe[column] = le.fit_transform(dataframe[column])
    return dataframe

def start_transforming(transform_json,file_path):
    json_data = {}
    dtypes_array = []
    drop = []
    encode = []

    std = []
    mean = []
    median = []

    fill_values = {}

    df = pd.read_csv(file_path,index_col=False)

        
    transform_json = transform_json.replace('{','').replace('}','').replace("'","").replace('"','')
    transform_dict = {item.split(':')[0].strip(): item.split(':')[1].strip() for item in transform_json.split(',')}
    
    # print(transform_dict)

    for key, value in transform_dict.items():
        if (value == 'drop'):
            drop.append(key)
        elif (value == 'std'):
            std.append(key)
        elif (value == 'mean'):
            mean.append(key)
        elif (value == 'median'):
            median.append(key)
        elif (value == 'encode'):
            encode.append(key)

    # print(drop)
    # print(encode)
    # print(std)
    # print(mean)
    # print(median)

    if (len(drop) > 0):
        df = df.drop(columns=drop)
    if (len(encode) > 0):
        df = encode_df(df, encode)

    if (len(std) > 0):
        for col in std:
            std_value = df[col].std()
            fill_values[col] = std_value

    if (len(mean) > 0):
        for col in mean:
            mean_value = df[col].mean()
            fill_values[col] = mean_value

    if (len(median) > 0):
        for col in median:
            median_value = df[col].median()
            fill_values[col] = median_value

    df = df.fillna(value=fill_values)
    
    json_data["sample_records"] = df.head().to_json(orient='split')
    json_data["shape"] = json.dumps({'rows': df.shape[0], 'columns': df.shape[1]})
    json_data["non_null_count"] = df.isna().sum(axis=0).to_frame().to_json(orient='split')

    dtypes_array.append(df.mean().to_json())
    dtypes_array.append(df.median().to_json())
    dtypes_array.append(df.std().to_json())
    dtypes_array.append(df.dtypes.to_frame().to_json(default_handler=str))

    json_data["dtypes"] = dtypes_array

    df.to_csv(file_path,index = False)

    print(json_data,flush=True)

start_transforming(transform_json,file_path)