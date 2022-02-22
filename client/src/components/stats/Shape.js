import React from 'react'

const Shape = (jsonstring) => {
    var shape = jsonstring['message']

    return (
        <table className="table table-bordered">
            <caption>Shape</caption>
            <thead>
                <tr>
                    {Object.keys(shape).map((key, index) => {
                        return <th key={index}>{key.toUpperCase()}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {Object.values(shape).map((key, index) => {
                        return <td key={index}>{key}</td>
                    })}
                </tr>
            </tbody>
        </table>
    )
}

export default Shape
