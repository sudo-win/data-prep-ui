import React from 'react'

const DTypes = (jsonstring) => {
    
    

    var dtypes = jsonstring['message'][3]

    console.log(dtypes)

    return (
        <table className="table table-bordered">
            <caption>Data Types</caption>
            <thead>
                <tr>
                    {Object.keys(dtypes[0]).map((key, index) => {
                        return <th key={index}>{key.toUpperCase()}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {Object.values(dtypes[0]).map((key, index) => {
                        return <td key={index}>{key}</td>
                    })}
                </tr>
            </tbody>
        </table>
    )
}

export default DTypes
