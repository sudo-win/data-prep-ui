import pandas as pd
import sys
import json


pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

file_path = sys.argv[1]


def start_analysis(file_path):
    # print(file_path)
    json_array = []
    json_data = {}
    dtypes_array = []
    df = pd.read_csv(file_path,index_col=False)
    json_data["sample_records"] = df.head().to_json(orient='split')
    # sample_records_json_string = json.dumps("{ sample_records : "+df.head().to_json(orient='split') + "}")
    # json_array.append(sample_records_json_string)
    json_data["shape"] = json.dumps({'rows': df.shape[0],'columns':df.shape[1]})
    # shape_json_string = json.dumps("{ 'shape' : {'rows': "+str(df.shape[0])+",'columns':"+str(df.shape[1])+"} }")
    # json_array.append(shape_json_string)

    json_data["non_null_count"] = df.isna().sum(axis=0).to_frame().to_json(orient='split')
    # non_null_count_json_string = json.dumps("{ 'non_null_count' : " + df.isna().sum(axis=0).to_frame().to_json(orient='split') + "}")
    # json_array.append(non_null_count_json_string)

    dtypes_array.append(df.mean(numeric_only=True).to_json())
    dtypes_array.append(df.median(numeric_only=True).to_json())
    dtypes_array.append(df.std(numeric_only=True).to_json())
    dtypes_array.append(df.dtypes.to_frame().to_json(default_handler=str))

    json_data["dtypes"] = dtypes_array
    # dtypes_json_string = json.dumps("{ 'dtypes' : " + df.dtypes.to_frame().to_json(default_handler=str) + "}")
    # json_array.append(dtypes_json_string)
    # json_data = json.dumps(json_data)
    # sys.stdout.flush()

    print(json_data,flush=True)

start_analysis(file_path)