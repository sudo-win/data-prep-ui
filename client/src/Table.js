import React from "react";

export default function Table({tableData}) {

     const [column, setColumn] = React.useState();
     setColumn(Object.keys(tableData[0]));

    const ThData =()=>{
        return column.map((data)=>{
              return <th key={data}>{data}</th>
          })
      }
     // get table row data
     const tdData =() =>{
  
        return tableData.map((data)=>{
          return(
              <tr>
                   {
                      column.map((v)=>{
                          return <td>{data[v]}</td>
                      })
                   }
              </tr>
          )
        })
   }
        

     


     return (
        <table className="table">
          <thead>
           <tr>{ThData()}</tr>
          </thead>
          <tbody>
          {tdData()}
          </tbody>
         </table>
    )

     }

