import React from 'react';
import { Nav } from 'reactbulma'
import './HeaderEcommerce.css';
import Logo from "../Images/logo.png";

class ShowEcommerceHeader extends React.Component {
    render(){
        return <div id="ShowEcommerceHeader">
            <Nav>
                <div className="container">
                        <div className="navbar-brand">
                        <img src={Logo} alt="Bulma logo" style={{height: 90 + 'px'}}/>
                            <span className="navbar-item" style={{paddingBottom: 0 + 'em'}}>
                                
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