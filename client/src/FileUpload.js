import React from 'react'
import axios from 'axios'
import './App.css'
import { ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SampleRecordsComp from './components/stats/SampleRecords'
import ShapeComp from './components/stats/Shape'
import DTypesComp from './components/stats/DTypes'
import NullCountComp from './components/stats/NullCount'
import Transform from './components/nav/Transform'

export default function FileUpload() {
    const [uploadFile, setUploadFile] = React.useState()
    const [progress, setProgress] = React.useState()
    const [tableData, setTableData] = React.useState()
    const [sampleRecords, setSampleRecords] = React.useState()
    const [shape, setShape] = React.useState()
    const [dtypes, setDtypes] = React.useState()
    const [nullCount, setNullCount] = React.useState()
    const [state, setState] = React.useState(true)

    const hideTablesMethod = () => {
        setTableData()
    }

    const submitForm = (event) => {
        event.preventDefault()

        const dataArray = new FormData()
        dataArray.append('csvfile', uploadFile)

        axios
            .post('/fileUpload', dataArray, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (data) => {
                    setProgress(Math.round((100 * data.loaded) / data.total))
                },
            })
            .then((response) => {
                
                setSampleRecords(
                    JSON.parse(
                        response.data
                            .replace("'sample_records'", '"sample_records"')
                            .replaceAll("'{", '{')
                            .replaceAll("}'", '}')
                            .replace("'shape'", '"shape"')
                            .replace("'dtypes'", '"dtypes"')
                            .replace("'non_null_count'", '"non_null_count"')
                    )['sample_records']
                )
                

                setShape(
                    JSON.parse(
                        response.data
                            .replace("'sample_records'", '"sample_records"')
                            .replaceAll("'{", '{')
                            .replaceAll("}'", '}')
                            .replace("'shape'", '"shape"')
                            .replace("'dtypes'", '"dtypes"')
                            .replace("'non_null_count'", '"non_null_count"')
                    )['shape']
                )

                
                setDtypes(
                    JSON.parse(
                        response.data
                            .replace("'sample_records'", '"sample_records"')
                            .replaceAll("'{", '{')
                            .replaceAll("}'", '}')
                            .replace("'shape'", '"shape"')
                            .replace("'dtypes'", '"dtypes"')
                            .replace("'non_null_count'", '"non_null_count"')
                    )['dtypes']
                )
                
                
                setNullCount(
                    JSON.parse(
                        response.data
                            .replace("'sample_records'", '"sample_records"')
                            .replaceAll("'{", '{')
                            .replaceAll("}'", '}')
                            .replace("'shape'", '"shape"')
                            .replace("'dtypes'", '"dtypes"')
                            .replace("'non_null_count'", '"non_null_count"')
                    )['non_null_count']
                )

                // console.log(sampleRecords);
                setTableData(response.data) // setTableData(tableData);
                setState(false)
            })
            .catch((error) => {
                console.log(error)
                // error response
            })
    }

    const onChangeMethod = (e) => {
        setUploadFile(e.target.files[0])
    }

    return (
        <div>
            {state && (
                <div className="form">
                    <form onSubmit={submitForm}>
                        <br />
                        <input
                            type="file"
                            className="btn-file-upload"
                            onChange={onChangeMethod}
                        />
                        <br />
                        <br />
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                        >
                            Upload File
                        </button>
                    </form>
                    <br />
                    <div className="progress-bar">
                        <ProgressBar now={progress} />
                    </div>
                </div>
            )}
            {tableData && (
                <div>
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-outline-info"
                            type="button"
                            onClick={hideTablesMethod}
                        >
                            Load More Options
                        </button>
                    </div>

                    <SampleRecordsComp message={sampleRecords} />
                    <ShapeComp message={shape} />
                    <DTypesComp message={dtypes} />
                    <NullCountComp message={nullCount} />
                </div>
            )}
            {!tableData && !state && (
                <div>
                    <Transform message={dtypes} />
                </div>
            )}
        </div>
    )
}
