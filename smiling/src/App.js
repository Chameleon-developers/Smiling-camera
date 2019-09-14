import React from 'react';
import './App.css';

//la funcion permite que se le pase un parametro
function HelloWorld(props){
  return(
    <div id="hello">props</div>
  )
}
/*
formas de representar una funcion en react
class App extends React.Component{
  render(){
    return <div>This is my component <HelloWorld/></div>
  }
}*/

//const App = () => <div>This is my component: <HelloWorld/></div>

function App() {
  return (
    <div>this is my component: <HelloWorld text="Hello fazt"/> <HelloWorld/></div>
  );
}

export default App;
