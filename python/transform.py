import pandas as pd
import sys
import json

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

transform_json = sys.argv[1]
file_path = sys.argv[2]


def start_transforming(transform_json,file_path):
    json_data = {}
    df = pd.read_csv(file_path,index_col=False,dtype='unicode')
    df = df.fillna(transform_json)
    json_data["sample_records"] = df.head().to_json(orient='split')
    json_data["shape"] = json.dumps({'rows': df.shape[0], 'columns': df.shape[1]})
    json_data["non_null_count"] = df.isna().sum(axis=0).to_frame().to_json(orient='split')
    json_data["dtypes"] = df.dtypes.to_frame().to_json(default_handler=str)
    df.to_csv(file_path)

    print(json_data,flush=True)

start_transforming(transform_json,file_path)