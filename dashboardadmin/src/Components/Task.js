import React from 'react';
//import './Task.css';

class Task extends React.Component {
    render(){
        const { task } = this.props;

        return <div>
            <p className="red">
                {task.title} - 
                {task.descripcion} - 
                {task.done} - 
                {task.id}
                <input type="checkbox"></input>
                <button>x</button>
            </p>
        </div>
    }
}

export default Task;