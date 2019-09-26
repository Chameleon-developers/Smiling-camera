import React from 'react'
import { Hero } from 'reactbulma'
import { Nav } from 'reactbulma'
import { Container } from 'reactbulma'
import { Button } from 'reactbulma'
import { Icon } from 'reactbulma'
import { Title } from 'reactbulma'
import { SubTitle } from 'reactbulma'
import { Tabs } from 'reactbulma'
import Showecommerceheader from './EcommerceHeader.js'
import Showecommercemenu from './EcommerceMenu.js'
import Showecommercefooter from './EcommerceFooter.js'
/*
    Notas, el color azul de fondo hay que reemplazarlo con la imagen llamada tecnicamara.jpg
    en la carpeta Images, lo mejor sera usando css para importar y agregar la imagen
*/
class Portada extends React.Component {
    render(){
        return <div>
            <div class="steps" id="stepsDemo">
  <div class="step-item is-active is-success">
    <div class="step-marker">1</div>
    <div class="step-details">
      <p class="step-title">Account</p>
    </div>
  </div>
  <div class="step-item">
    <div class="step-marker">2</div>
    <div class="step-details">
      <p class="step-title">Profile</p>
    </div>
  </div>
  <div class="step-item">
    <div class="step-marker">3</div>
    <div class="step-details">
      <p class="step-title">Social</p>
    </div>
  </div>
  <div class="step-item">
    <div class="step-marker">4</div>
    <div class="step-details">
      <p class="step-title">Finish</p>
    </div>
  </div>
  <div class="steps-content">
    <div class="step-content has-text-centered is-active">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Username</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" name="username" id="username" type="text" placeholder="Username" autofocus data-validate="require"/>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icon has-icon-right">
              <input class="input" type="password" name="password" id="password" placeholder="Password" data-validate="require"/>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Confirm password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icon has-icon-right">
              <input class="input" type="password" name="password_confirm" id="password_confirm" placeholder="Confirm password" data-validate="require"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="step-content has-text-centered">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Firstname</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" name="firstname" id="firstname" type="text" placeholder="Firstname" autofocus data-validate="require"/>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Last name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icon has-icon-right">
              <input class="input" type="text" name="lastname" id="lastname" placeholder="Last name" data-validate="require"/>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Email</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icon has-icon-right">
              <input class="input" type="email" name="email" id="email" placeholder="Email" data-validate="require"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="step-content has-text-centered">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Facebook account</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" name="facebook" id="facebook" type="text" placeholder="Facebook account url" autofocus data-validate="require"/>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Twitter account</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" name="twitter" id="twitter" type="text" placeholder="Twitter account url" autofocus data-validate="require"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="step-content has-text-centered">
      <h1 class="title is-4">Your account is now created!</h1>
    </div>
  </div>
  <div class="steps-actions">
    <div class="steps-action">
      <a href="#" data-nav="previous" class="button is-light">Previous</a>
    </div>
    <div class="steps-action">
      <a href="#" data-nav="next" class="button is-light">Next</a>
    </div>
  </div>
</div>
        </div>
        
    }
} 

export default Portada;