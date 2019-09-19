import React from 'react';
import usrs from '../sample/usuarios.json';
import Rowsusers from './Tableusers.js';
import { Table, Container } from 'reactbulma'
import './Tableuser.css'

class Tableusers extends React.Component{
   state = {
    usrs: usrs
  }
  render(){
    return(
        <Container>
            <div className="table-container">
                <Table hoverable>
                    <Table.Head className="has-background-primary has-text-white">
                    <Table.Tr className="has-background-primary has-text-white">
                        <Table.Th className="has-background-primary"><abbr title="Usuario">Usuario</abbr></Table.Th>
                        <Table.Th ><abbr title="e-mail">Correo</abbr></Table.Th>
                        <Table.Th><abbr title="Tipo de usuario">Tipo</abbr></Table.Th>
                        <Table.Th><abbr title="Estatus">Estatus</abbr></Table.Th>
                        <Table.Th><abbr title="Acciones">Editar</abbr></Table.Th>
                        <Table.Th><abbr title="Acciones">Borrar</abbr></Table.Th>
                    </Table.Tr>
                    </Table.Head>
                    
                    <Table.Body>
                    <Rowsusers usrs = { this.state.usrs}/>
                    </Table.Body>
                </Table>
            </div>
        </Container>
    )
  }
}

export default Tableusers;
