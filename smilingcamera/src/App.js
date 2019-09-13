import React from 'react';
import './App.css';
import Tasks from './sample/tasks';
import Tareas from './Components/Tasks.js';
/*
import Menu from './Components/Menu';

import logo from './logo.svg';

function HelloWorld(props) { 
  return(
    <div id="hello">
      <h3>{props.mytxt}</h3>
      {props.sub}
    </div>
  )
}

//const App2 = () => {<div>tHIS IS MU componente <HelloWorld/></div>};
class HelloWorld2 extends React.Component {
state = {
  show: true
}
  toggleShow = () => {
    this.setState({ show: !this.state.show})
  }

  render (){
    if(this.state.show)
      return(
        <div id="hello">
          <h3>{this.props.mytxt}</h3>
          {this.props.sub}
          <button onClick={this.toggleShow}>Toggle show</button>
        </div>
      )
    else return <h1>No hay elemento t2
      <button onClick={this.toggleShow}>Toggle show</button>
        
    </h1>
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>This is my component: 
          <HelloWorld2 mytxt={"T1"} sub={"loren ip"}/>
          <HelloWorld2 mytxt={"T2"}/>
          <HelloWorld mytxt={"T3"}/>
        </div>
        <Menu/>
      </header>
    </div>
  );
}
*/
class App extends React.Component{
 
  state = {
    Tasks: Tasks
  }
  render(){
    return(
      <div>
        {
          <Tareas tasks={this.state.Tasks}/>
        }
      </div>
      
    )
  }
}

export default App;
