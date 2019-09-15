import React from 'react';
import './EcommerceMenu.css';

class EcommerceMenu extends React.Component {
    render(){
        return <div id="ShowMenuEcommerce">
            <nav className="navbar" role="navigation" aria-label="main navigation">

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                    <a className="navbar-item">
                        Home
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Services
                        </a>

                        <div className="navbar-dropdown">
                        <a className="navbar-item">
                            About
                        </a>
                        <a className="navbar-item">
                            Jobs
                        </a>
                        <a className="navbar-item">
                            Contact
                        </a>
                        <hr className="navbar-divider"/>
                        <a className="navbar-item">
                            Report an issue
                        </a>
                        </div>
                    </div>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Catalogo
                        </a>

                        <div className="navbar-dropdown">
                        <a className="navbar-item">
                            About
                        </a>
                        <a className="navbar-item">
                            Jobs
                        </a>
                        <a className="navbar-item">
                            Contact
                        </a>
                        <hr className="navbar-divider"/>
                        <a className="navbar-item">
                            Report an issue
                        </a>
                        </div>
                    </div>
                    
                    <a className="navbar-item">
                        Carrito
                    </a>
                    </div>

                    
                </div>
                </nav>
        </div>
    }
}

export default EcommerceMenu;