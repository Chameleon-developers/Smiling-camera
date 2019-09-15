import React from 'react';
import { Nav } from 'reactbulma'
import './HeaderEcommerce.css';

class ShowEcommerceHeader extends React.Component {
    render(){
        return <div id="ShowEcommerceHeader">
            <Nav>
                <div className="container">
                        <div className="navbar-brand">
                            <span className="navbar-item">
                                <img id="showLogoHeader" src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo"/>
                            </span>

                                <div className="navbar-menu">
                                <div className="navbar-end">
                                    <div className="navbar-item field">
                                        <p className="control">
                                            <span className="field has-addons">
                                                <input id="searchInputHeader" className="input is-danger" type="text" />
                                                <a id="searchButtonHeader" className="button ">Buscar</a>
                                            </span>
                                        </p>
                                            
                                    </div>
                            
                            
                                    
                                    <a id="LinkUserAccount" className="navbar-item is-hidden-touch is-hidden-desktop-only">
                                        <span className="icon" >
                                            <i className="fa fa-user-circle fa-2x"></i>
                                        </span>
                                    </a>
                                
                            
                                    
                                    <a id="LinkUserAccount" className="navbar-item is-hidden-touch is-hidden-desktop-only">
                                        <span className="icon" >
                                        <i className="fa fa-shopping-cart fa-2x"></i>
                                        </span>
                                    </a>
                        
                                </div>
                            </div>

                       
                        </div>
                        
                        
                        
                </div>
            </Nav>
        </div>
    }
}

export default ShowEcommerceHeader;