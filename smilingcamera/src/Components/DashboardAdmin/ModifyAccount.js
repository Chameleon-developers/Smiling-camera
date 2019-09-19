import React from 'react'
import { Container } from 'reactbulma'
import './Admin.css'

class Showmodifieraccount extends React.Component{
    validaCorreo(mail){
        var reg="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
        var res=true;
        if(reg.test(mail) ? res=true : res=false);
        return res;
    }

    render(){
      return(
          <Container>
            <div className="field">
                <label className="label">Nombre de usuario</label>
                <div className="control">
                    <input className="input is-primary" type="text"/>
                </div>
            </div>

            <div className="field">
                <label className="label">e-mail</label>
                <div className="control">
                    <input className="input is-primary" type="email"/>
                </div>
                <p className="help is-danger" id="ValidationMail">Correo incorrecto</p>
            </div>

            <div className="field">
                <label className="label">e-mail alterno</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" type="email"/>
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
                    <button className="button is-primary">{/*onclick= validaCorreo(mail)*/}Guardar</button>
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