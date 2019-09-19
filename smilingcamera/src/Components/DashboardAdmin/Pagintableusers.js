import TablePagination from '@material-ui/core/TablePagination';
import React from 'react';
import MaterialTable from 'material-table';
import usrs from '../../sample/usrs2.json';
import { Container } from 'reactbulma'
import { fontFamily } from '@material-ui/system';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'e-mail', field: 'email'},
      { title: 'e-mail Alterno', field: 'aemail'},
      { title: 'Username', field: 'username'/*
        cellStyle: {
          backgroundColor: '#039be5',
          color: '#FFF'
        },*/
      },
      
      //{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Tipo de usuario',
        field: 'type',
        lookup: { 1: 'Administrador', 2: 'Operador' }
      },
    ],
    data: usrs
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