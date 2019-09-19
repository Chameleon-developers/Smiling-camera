import React from 'react'

class AdminMenu extends React.Component{
    render(){
        return <div>
                    <ul id="slide-out" className="sidenav sidenav-fixed">
                        <li>
                            <div className="user-view">
                                <div className="background">
                                    <img src="./images/fondo.png" alt="fondo_user"/>
                                </div>
                                <a href="#user"><img className="circle" src="./images/yuna.png" alt="img_usr"/></a>
                                <a href="#name"><span className="white-text name">John Doe</span></a>
                                <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                            </div>
                        </li>
                        <li><a href="#!"><i className="icon fa fa-users"></i>Gestionar Usuarios</a></li>
                        <li><a href="#!">Second Link</a></li>
                        <li><div className="divider"></div></li>
                        <li><a className="subheader">Subheader</a></li>
                        <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
                    </ul>
                    <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>  
            </div>
    }
}


export default AdminMenu;