import React from 'react';
import './App.css';
import Portada from './Components/Hero';
import Admin from './Components/DashboardAdmin/AdminDashboard.js';
import Showuserstable from './Components/Showtableusers.js'
import Pagintab from './Components/DashboardAdmin/Pagintableusers'
import Loginadmin from './Components/DashboardAdmin/SignIn.js'
class App extends React.Component{
  render(){
    return(
        //<Portada/>
        // <Admin></Admin>
      
        //<Showuserstable/>
        //<Pagintab></Pagintab>
        <Loginadmin></Loginadmin>

    )
    
  }
}

export default App;