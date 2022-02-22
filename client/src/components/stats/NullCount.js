import React from 'react'

const NullCount = (jsonstring) => {
    var values = Object.values(jsonstring['message'])
    var header = values[1]
    var matrix = values[2]

    return (
        <table className="table table-bordered table-responsive">
            <caption>Null Count</caption>
            <thead>
                <tr>
                    {header.map((key, index) => {
                        return <th key={index}>{key.toUpperCase()}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {matrix.map((key, index) => {
                        return <td key={index}>{key}</td>
                    })}
                </tr>
            </tbody>
        </table>
    )
}

export default NullCount
