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

const EmployeeTable = props => {
  const tableRef = React.createRef();
  const [SnackbarState, setSnackbarState] = React.useState({
    open: false,
    message: ""
  });

  const handleClose = () => {
    setSnackbarState({ ...SnackbarState, open: false });
  };

  const onRowAdd = newData =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(process.env.REACT_APP_BACKEND_URL +"/users", newData).then( res => {
          setSnackbarState({ open: true, message: "Successfully added" });
      resolve();
        }).catch(error => { 
          setSnackbarState({ open: true, message: error.response.data.message });
          resolve();
        });
      }, 600);
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.patch( process.env.REACT_APP_BACKEND_URL + "/users/" + oldData.id, newData).then( res => {
            setSnackbarState({ open: true, message: "Successfully updated" });
            resolve();
        }).catch(error => { 
          setSnackbarState({ open: true, message: error.response.data.message });
          resolve();
        });
      },600);   
    });

  const onRowDelete = oldData =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
          axios.delete(process.env.REACT_APP_BACKEND_URL + "/users/" + oldData.id).then( res => {
          setSnackbarState({ open: true, message: "Successfully deleted" });
          resolve();
          }).catch(error => {
            console.log(error);
            setSnackbarState({ open: true, message: error.response.data.message });
            resolve();
        });
      },600); 
    });

  return (
    <>
      <MaterialTable
        title="Employee Data"
        columns={colHeader}
        tableRef={tableRef}
        data={query =>
          new Promise((resolve, reject) => {
            let url = 'http://localhost:8080/users?'
            url += 'limit=' + query.pageSize
            url += '&offSet=' + (query.page)
            url += '&minSalary=' + parseFloat(props.minSalary)||0
            url += '&maxSalary=' + parseFloat(props.maxSalary)||99999
            url += '&sort='
            url += (query.orderDirection != "")? (((query.orderDirection == "asc") ? "%2b" : "-") + query.orderBy.field) : "%2bid"
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.result,
                  page: result.page.page_no,
                  totalCount: result.page.total_item
                });
              })
          })
        }
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          }
        ]}
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