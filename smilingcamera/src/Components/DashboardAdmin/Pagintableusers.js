import TablePagination from '@material-ui/core/TablePagination';
import React from 'react';
import MaterialTable from 'material-table';
import usrs from '../../sample/usrs2.json';
import { Container } from 'reactbulma'
import { fontFamily } from '@material-ui/system';

function getData(){
  fetch("http://" + document.domain+":3500/getUsers",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
            return response.json(); // call the json method on the response to get JSON
        })
        .then(function (json) {
            console.log(json);
            
  });
}
/*{
        title: 'Status',
        field: 'status',
        lookup: { true: 'Activo', false: 'Inactivo' }
      },
*/ 
export default function MaterialTableDemo() {
  
  const [state, setState] = React.useState({
    

    columns: [{ title: 'Nombre de Usuario', field: 'nameUser'
    
    
    },
    { title: 'email', field: 'mainEmail'},
    //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Tipo de usuario',
      field: 'idTypeUser',
      lookup: { 1: 'Administrador', 2: 'Normal' }
    }],
      

    
    //data: usrs
    data: getData()
  });

  return (
    <Container>
    <MaterialTable
      title="Tabla de Usuarios"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              if (data.email == "baran@hotmail.com") {
                data.push(newData);
              }
              
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
      options={{
        headerStyle: {
          backgroundColor: '#4AE0B8',
          color: '#FFF',
          fontFamily:'Barlow'
        }
      }}
    />
    </Container>
  );
}