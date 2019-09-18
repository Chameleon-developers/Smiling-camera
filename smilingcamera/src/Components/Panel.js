import React from 'react';
import Box from './BoxAdmin';
import './Boxes.css';

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
                        General
                    </p>
                    <ul class="menu-list">
                        <li><a>Dashboard</a></li>
                        <li><a>Customers</a></li>
                    </ul>
                    <p class="menu-label">
                        Administration
                    </p>
                    <ul class="menu-list">
                        <li><a>Team Settings</a></li>
                        <li>
                        <a class="is-active">Manage Your Team</a>
                        <ul>
                            <li><a>Members</a></li>
                            <li><a>Plugins</a></li>
                            <li><a>Add a member</a></li>
                        </ul>
                        </li>
                        <li><a>Invitations</a></li>
                        <li><a>Cloud Storage Environment Settings</a></li>
                        <li><a>Authentication</a></li>
                    </ul>
                    <p class="menu-label">
                        Transactions
                    </p>
                    <ul class="menu-list">
                        <li><a>Payments</a></li>
                        <li><a>Transfers</a></li>
                        <li><a>Balance</a></li>
                    </ul>
                    </aside>
                </div>
                             
                <div class="dashboard-main is-scrollable">
                    <nav class="navbar is-fixed-top is-dark">
                    <div class="navbar-menu">
                        <div class="navbar-end">
                        <span class="navbar-item">
                            Fixed-top navbar
                        </span>
                        </div>
                    </div>
                    </nav>
                
                    <section class="section">
                    <p class="title is-size-2 is-spaced">
                        The Bulma Dashboard
                    </p>

                    <p class="subtitle is-size-3">
                        A Bulma extension for full-page dashboard-style layouts
                    </p>

                    <hr />

                    <section class="content is-medium">
                    <Box/>

                       
                    </section>
                    </section>
                
                    
                    
                </div>

            </div>
        </div>
    }
}

export default Panel;