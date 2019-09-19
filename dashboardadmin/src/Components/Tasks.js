import React from 'react';
import Taskk from './Task.js';

class Task extends React.Component {
    render(){
        return this.props.tasks.map(e =><Taskk task={e} key={e.id}/>)
    }
}

export default Task;