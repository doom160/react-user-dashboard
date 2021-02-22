import React, { useState, useEffect  } from 'react'
import Snackbar from '@material-ui/core/Snackbar';

import MaterialTable from 'material-table'

const axios = require('axios');

const colHeader = [
  { title: "Id", field: "id" },
  { title: "Name", field: "name" },
  { title: "Login", field: "login" },
  { title: "Salary", field: "salary", type: "currency" }
];

var data = [];

axios.get( process.env.REACT_APP_BACKEND_URL + '/users')
.then(function (response) {
  data  = response.data.result;
})
.catch(function (error) {
  console.log(error);
});


const EmployeeTable = props => {
  const [SnackbarState, setSnackbarState] = React.useState({
    open: false,
    message: ""
  });

  const handleClose = () => {
    setSnackbarState({ ...SnackbarState, open: false });
  };

  const [gridData, setGridData] = useState({
    data: data.filter( user => (user.salary >= (parseFloat(props.minSalary)||0) && user.salary <= (parseFloat(props.maxSalary)||99999))) ,
    columns: colHeader,
    resolve: () => {},
    updatedAt: new Date()
  });

  gridData.data = data.filter( user => (user.salary >= (parseFloat(props.minSalary)||0) && user.salary <= (parseFloat(props.maxSalary)||99999)))
  useEffect(() => {
    gridData.resolve();
   }, [gridData]);

  const onRowAdd = newData =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        axios.post(process.env.REACT_APP_BACKEND_URL +"/users", newData).then( res => {
          setSnackbarState({ open: true, message: "Successfully added" });
          data.push(newData);
          const updatedAt = new Date();
          setGridData({ ...gridData, data, updatedAt, resolve });
        }).catch(error => { 
          setSnackbarState({ open: true, message: error.response.data.message });
        });
      }, 600);
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        axios.patch( process.env.REACT_APP_BACKEND_URL + "/users/" + oldData.id, newData).then( res => {
            setSnackbarState({ open: true, message: "Successfully updated" });
            // Copy current state data to a new array
            // Get edited row index
            const index = data.indexOf(oldData);
            // replace old data
            data[index] = newData;
            // update state with the new array
            const updatedAt = new Date();
            setGridData({ ...gridData, data, updatedAt, resolve });
        }).catch(error => { 
          setSnackbarState({ open: true, message: error.response.data.message });
        });
      },600);   
    });

  const onRowDelete = oldData =>
    new Promise((resolve, reject) => {
      resolve();
      setTimeout(() => {
          axios.delete(process.env.REACT_APP_BACKEND_URL + "/users/" + oldData.id).then( res => {
          setSnackbarState({ open: true, message: "Successfully deleted" });
          const index = data.indexOf(oldData);
          data.splice(index, 1);
          const updatedAt = new Date();
          setGridData({ ...gridData, data, updatedAt, resolve });
          }).catch(error => {
            setSnackbarState({ open: true, message: error.response.data.message });
        });
      },600); 
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
      <Snackbar open={SnackbarState.open} autoHideDuration={2500} message={SnackbarState.message} onClose={handleClose} />
    </>
  );
};

export default EmployeeTable;