import React from 'react'
import { Container } from 'reactbulma'
import './Admin.css'

class Showmodifieraccount extends React.Component{
    constructor() {
        super()
        this.MarkUser = React.createRef()
    }
    validaCorreo(mail){
        var reg=new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
        var res=true;
        if(reg.test(mail) ? res=true : res=false);
        return res;
    }

    validarCampos(usr, mail, amail){
        
        alert(usr);
        var messageUser = document.getElementById("ValidationUsername");
        var messageMail = document.getElementById("ValidationMail");
        var messageAmail = document.getElementById("validationAlternmail");
    
        if (usr.isEmpty() || usr.trim()==""){
            messageUser.show();
        }
        else {
            messageUser.hide();
        }
        if(!mail.isEmpty() || mail.trim()=="" || this.validaCorreo(mail)==false) {
            messageMail.show();
        }
        else {
            messageMail.hide();
        }
        if(amail.isEmpty() || amail.trim()=="" || this.validaCorreo(amail)==false) {
            messageAmail.show();
        }
        else {
            messageAmail.hide();
        }
    }

    render(){
      return(
          <Container>
            <div className="field">
                <label className="label">Nombre de usuario</label>
                <div className="control">
                    <input ref = { this.markUser } id="markUser" className="input is-primary" type="text"/>
                </div>
                <p className="help is-danger" id="ValidationUsername">Nombre de usuario incorrecto</p>
            </div>

            <div className="field">
                <label className="label">e-mail</label>
                <div className="control">
                    <input id="markMail" className="input is-primary" type="email"/>
                </div>
                <p className="help is-danger" id="ValidationMail">Correo incorrecto</p>
            </div>

            <div className="field">
                <label className="label">e-mail alterno</label>
                <div className="control has-icons-left has-icons-right">
                    <input id="markAmail" className="input is-primary" type="email"/>
                </div>
                <p className="help is-danger" id="validationAlternmail">Correo incorrecto</p>
                
            </div>

            <div className="field" id="SelectorTypeUser">
                <label className="label">Tipo de usuario</label>
                <div className="control">
                    <div className="select is-primary">
                    <select>
                        <option>Aministrador</option>
                        <option>Operador</option>
                    </select>
                    </div>
                </div>
            </div>

            <div className="field is-grouped" id="Actionbtnform">
                <div className="control">
                    <button className="button is-primary"  >{/*{this.validarCampos(document.getElementById("markUser").value,document.getElementById("markMail").value,document.getElementById("markAmail").value)}*/}Guardar</button>
                </div>
                <div className="control">
                    <button className="button">Cancelar</button>
                </div>
            </div> 
            </Container>
      )
      
    }
  }
  
  export default Showmodifieraccount;