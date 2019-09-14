import React from 'react'
import { Button } from 'reactbulma'

  
class Buttons extends React.Component {
    render(){
        return <div>
            <Button primary>Primary</Button>
            <Button info>Info</Button>
            <Button success>Success</Button>
            <Button warning>Warning</Button>
            <Button danger>Danger</Button>
        </div>
    }
} 

export default Buttons;