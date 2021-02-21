import React, { useState, useEffect  } from 'react'
import MaterialTable from 'material-table'

const axios = require('axios');

const colHeader = [
  { title: "Id", field: "id" },
  { title: "Name", field: "name" },
  { title: "Login", field: "login" },
  { title: "Salary", field: "salary", type: "currency" }
];

{/* data.filter( user => user.salary >= (parseFloat(minSalary)||0) && user.salary <= (parseFloat(maxSalary)||99999 */}

var data = [];

axios.get('http://localhost:8080/users')
.then(function (response) {
  data  = response.data.result;
  console.log(data);
})
.catch(function (error) {
  console.log(error);
});


const EmployeeTable = props => {
  const [gridData, setGridData] = useState({
    data: data.filter( user => (user.salary >= (parseFloat(props.minSalary)||0) && user.salary <= (parseFloat(props.maxSalary)||99999))) ,
    columns: colHeader,
    resolve: () => {},
    updatedAt: new Date()
  });

  gridData.data = data.filter( user => (user.salary >= (parseFloat(props.minSalary)||0) && user.salary <= (parseFloat(props.maxSalary)||99999)))
  console.log(gridData.data)
  console.log( (parseFloat(props.minSalary)||0) + " " + (parseFloat(props.maxSalary)||99999) )
  console.log(data)
  useEffect(() => {
    gridData.resolve();
   }, [gridData]);

  const onRowAdd = newData =>
    new Promise((resolve, reject) => {
      let res = axios.post("http://localhost:8080/users", newData);
      if(res.status == "200"){
        data.push(newData);
        const updatedAt = new Date();
        setGridData({ ...gridData, data, updatedAt, resolve });
      } else {

      }
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      // Copy current state data to a new array
      // Get edited row index
      let res = axios.patch("http://localhost:8080/users/" + oldData.id, newData);
      if(res.status == "200"){
        const index = data.indexOf(oldData);
        // replace old data
        data[index] = newData;
        // update state with the new array
        const updatedAt = new Date();
        setGridData({ ...gridData, data, updatedAt, resolve });
      }     
    });

  const onRowDelete = oldData =>
    new Promise((resolve, reject) => {
      let res = axios.delete("http://localhost:8080/users/" + oldData.id);
      if(res.status == "200"){
        const index = data.indexOf(oldData);
        data.splice(index, 1);
        const updatedAt = new Date();
        setGridData({ ...gridData, data, updatedAt, resolve });
      }
    });

  return (
    <>
      <MaterialTable
        title="Employee Data"
        columns={gridData.columns}
        data={gridData.data}
        options={{
          pageSize:30,
          pageSizeOptions:[10,30,50],
          search: false
        }}
        editable={{
          isEditable: rowData => true,
          isDeletable: rowData => true,
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,
          onRowDelete: onRowDelete
        }}
      />
    </>
  );
};

export default EmployeeTable;