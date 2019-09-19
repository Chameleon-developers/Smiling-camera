import React from 'react';
import './Boxes.css';
import BigBox from './BigBox';
import Pagintab from './DashboardAdmin/Pagintableusers'

class Panel extends React.Component {
    render(){
        return <div>
            <div class="dashboard">
      
                <div class="dashboard-panel is-small has-thick-padding has-background-grey-lighter is-hidden-mobile">
                    <div class="has-text-centered">
                    <img src="https://bulma.io/images/bulma-logo.png  " width="50%"/>
                    </div>

                    <br /><br />

                    <aside class="menu has-text-white">
                    <p class="menu-label">
                        Administracion
                    </p>
                    <ul class="menu-list">
                        <li><a>Productos</a></li>
                        <li><a>Usuarios</a></li>
                        <li><a>Estadísticas</a></li>
                        <li><a>Kioscos</a></li>
                    </ul>
                    
                    </aside>
                </div>
                             
                <div class="dashboard-main is-scrollable">
                    <nav class="navbar is-fixed-top is-dark">
                    <div class="navbar-menu">
                        <div class="navbar-end">
                        <span class="navbar-item">
                            Opciones
                        </span>
                        </div>
                    </div>
                    </nav>
                
                    <section class="section">
                    

                    <p class="subtitle is-size-3">
                        Gestión de usuarios
                    </p>

                    <hr />

                    <section class="content is-medium">
                        <Pagintab></Pagintab>

                       
                    </section>
                    </section>
                
                    
                    
                </div>

            </div>
        </div>
    }
}
/*<p class="title is-size-2 is-spaced">
                        Usuarios
                    </p>*/ 

export default Panel;