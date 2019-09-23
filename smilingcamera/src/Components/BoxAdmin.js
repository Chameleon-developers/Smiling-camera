import React from 'react';
import {Card} from 'reactbulma';
import {Content} from 'reactbulma';
import './Boxes.css';
import tasks from'../Prueba.json';

class BoxAdmin extends React.Component {
    state = {
        tasks: tasks
    }
    
    
    render(){
        
        return <div>
            {this.state.tasks.map(e => <Card id="boxAdmin">
                <Card.Header>
                    <Card.Header.Title>
                    {e.title}
                    </Card.Header.Title>
                    <Card.Header.Title centered>
                    Centered
                    </Card.Header.Title>
                    
                </Card.Header>
                <Card.Content>
                    <Content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                    <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
                    <br/>
                    <small>11:09 PM - 1 Jan 2016</small>
                    </Content>
                </Card.Content>
                <Card.Footer>
                    <Card.Footer.Item>Save</Card.Footer.Item>
                    <Card.Footer.Item>Edit</Card.Footer.Item>
                    <Card.Footer.Item>Delete</Card.Footer.Item>
                </Card.Footer>
            </Card> )}
            
        </div>
    }
}

export default BoxAdmin;