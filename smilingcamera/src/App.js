import React from 'react';
import './App.css';
import Portada from './Components/Hero';
import Admin from './Components/DashboardAdmin/AdminDashboard.js';
import Showuserstable from './Components/Showtableusers.js'
import Pagintab from './Components/DashboardAdmin/Pagintableusers'
import Loginadmin from './Components/DashboardAdmin/SignIn.js'
import Panel from './Components/Panel'
import {Link, Route,Router} from 'react-router';

class App extends React.Component{
  render(){
    return(
        //<Portada/>
        //<Admin></Admin>
        //<Panel></Panel>
        
        //<Pagintab></Pagintab>
        <Loginadmin></Loginadmin>

    )
    
  }
}

export default App;
