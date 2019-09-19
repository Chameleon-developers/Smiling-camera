import React from 'react';
import { render } from "react-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import $ from 'jquery';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





class SignIn extends React.Component {
  
  
  constructor() {
    super();
    this.state = {};
    
  }
//const classes = useStyles();+
/*
<div className={classes.paper}>
        <Avatar className={classes.avatar}>
        className={classes.form}
        className={classes.submit}
        <LockOutlinedIcon />
*/

  render() {
    
    return (
      
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar >
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={this.onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="userName"
            autoComplete="email"
            autoFocus
            onChange={this.onUserNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordUser"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onUserPassChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {this.renderUsuario()}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    );
  }

  renderUsuario() {
    if (this.state.userInfo == null) {
      return;
    }

    const { name, avatar_url, public_repos } = this.state.userInfo;

    return (
      <div>
        <h3>{name}</h3>
        <img src={`${avatar_url}`} />
        <p>Número de repos: {public_repos}</p>
      </div>
    );
  }

  onUserNameChange = e => {
    this.setState({ userName: e.target.value });
  };
  onUserPassChange = e => {
    this.setState({ passwordUser: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let data = {
      mainEmail: this.state.userName,
      passwordUser: this.state.passwordUser
    }
    console.log(this.state.passwordUser);
    
    fetch("http://" + document.domain+":3500/logIn",{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ mainEmail: this.state.userName, passwordUser: this.state.passwordUser })
    }).then(res => res.json());

     /* $.ajax({
        type: "POST",
        url: "http://" + document.domain+":3500/logIn",
        dataType: 'json',
        data: {
          "mainEmail": this.state.userName,
          "passwordUser": this.state.passwordUser
        },
        success: function(data){
          console.log(data);
        }
      }); */
  };
}
export default SignIn;
/*import React from "react";
import { render } from "react-dom";
const useStyles = makeStyles(theme => ({
      '@global': {
        body: {
          backgroundColor: theme.palette.common.white,
        },
      },
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));
    const classes = useStyles();
const classes = useStyles();

 */