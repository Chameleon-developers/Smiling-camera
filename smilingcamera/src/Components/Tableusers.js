import React from 'react';
import User from './Tableuser.js';

class Sendrowstableuser extends React.Component {
    render(){
        return this.props.usrs.map(e =><User user={e} key={e.id}/>)
    }
}

export default Sendrowstableuser;