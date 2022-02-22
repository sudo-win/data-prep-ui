import React from 'react'
import axios from 'axios'
import SampleRecordsComp from '../stats/SampleRecords'
import ShapeComp from '../stats/Shape'
import DTypesComp from '../stats/DTypes'
import NullCountComp from '../stats/NullCount'
import NavBar from './NavBar'
import NavBarDownload from './NavBarDownload'

function Transform(metadata) {
    var cols = Object.keys(metadata['message'][0])

    const [transformJson, setTransformJson] = React.useState({})
    const [sampleRecords, setSampleRecords] = React.useState()
    const [shape, setShape] = React.useState()
    const [dtypes, setDtypes] = React.useState()
    const [nullCount, setNullCount] = React.useState()
    const [showTransform, setShowTransform] = React.useState(true)
    const [showStats, setShowStats] = React.useState(false)
    var [transformCount, setTransformCount] = React.useState(0)

    const showTransformMethod = (e) => {
        setShowTransform(true)
    }

    const submitTransForm = (event) => {
        event.preventDefault()

        transformCount = transformCount + 1
        const eventFormArray = Object.values(event.target)

        eventFormArray.forEach((element) => {
            transformJson[element.name] = element.value
        })

        setTransformJson(transformJson)

        axios
            .post('/uploadTransform', transformJson, {
                headers: {
                    'Content-Type': 'application/json',
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
                setShowTransform(false)
                setShowStats(true)
            })
            .catch((error) => {
                console.log(error)
                // error response
            })
    }

    return (
        <div>
            {transformCount > 0 ? (
                <NavBar showTransformMethod={showTransformMethod} />
            ) : (
                <NavBarDownload showTransformMethod={showTransformMethod} />
            )}

            {showTransform && (
                <div>
                    <div>
                        <form onSubmit={submitTransForm}>
                            {cols.map((col, index) => {
                                return (
                                    <div className="row">
                                        <label
                                            htmlFor="colFormLabelLg"
                                            className="col-sm-2 col-form-label col-form-label-lg"
                                            key={index}
                                        >
                                            {col}
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="colFormLabelLg"
                                                placeholder="Replace null values with"
                                                key={index}
                                                name={col}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-primary btn-outline-info"
                                    type="submit"
                                    onSubmit={submitTransForm}
                                >
                                    Replace values in file
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showStats && (
                <div>
                    <SampleRecordsComp message={sampleRecords} />
                    <ShapeComp message={shape} />
                    <DTypesComp message={dtypes} />
                    <NullCountComp message={nullCount} />
                </div>
            )}
        </div>
    )
}

export default Transform
