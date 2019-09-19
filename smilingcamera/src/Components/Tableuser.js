import React from 'react'
import { Table } from 'reactbulma'

class Sendrowuser extends React.Component {
    render(){
        const { user } = this.props;
        
        return <Table.Tr>
            <Table.Th>{user.name}</Table.Th>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>{user.type}</Table.Td>
            <Table.Td>{user.status ? "Activo" : "Inactivo"}</Table.Td>
            <Table.Td>
                <a id="deleteUsr" className="button is-hidden-touch is-hidden-desktop-only">
                    <span className="icon" >
                        <i className="fa fa-pen fa-2x"></i>
                    </span>
                </a> 
            </Table.Td>
            <Table.Td>
                <a id="deleteUsr" className="button is-hidden-touch is-hidden-desktop-only">
                    <span className="icon" >
                        <i className="fa fa-trash-alt fa-2x"></i>
                    </span>
                </a>
            </Table.Td>
        </Table.Tr>
    }
}

export default Sendrowuser;