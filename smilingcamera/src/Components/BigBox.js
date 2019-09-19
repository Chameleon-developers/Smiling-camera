import React from 'react';
import {Card} from 'reactbulma';
import {Content} from 'reactbulma';
import Pagintab from './DashboardAdmin/Pagintableusers'

class BigBox extends React.Component {
    render(){
        return <div>
            <Card id="BigBox">
                <Card.Header>
                    <Card.Header.Title>
                        Usuario
                    </Card.Header.Title>
                    
                </Card.Header>
                <Card.Content>
                    
                </Card.Content>
                <Card.Footer>
                    <Card.Footer.Item>Save</Card.Footer.Item>
                    <Card.Footer.Item>Edit</Card.Footer.Item>
                    <Card.Footer.Item>Delete</Card.Footer.Item>
                </Card.Footer>
            </Card>
            
        </div>
    }
}

export default BigBox;