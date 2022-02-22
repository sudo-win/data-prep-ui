import React from 'react'

const SampleRecordsComp = (jsonstring) => {
    var values = Object.values(jsonstring)
    var header = Object.values(values[0])[0]
    var matrix = values[0]['data']

    return (
        <table className="table table-bordered table-responsive">
            <caption>Sample Records</caption>
            <thead>
                <tr>
                    {header.map((key, index) => {
                        return <th key={index}>{key.toUpperCase()}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {matrix.map((numList, i) => (
                    <tr key={i}>
                        {numList.map((num, j) => (
                            <td key={j}>{num}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SampleRecordsComp
