import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import teal from '@material-ui/core/colors/teal'; //verde
import pink from '@material-ui/core/colors/pink'; //rosa
import cyan from '@material-ui/core/colors/cyan'; //azul
import grey from '@material-ui/core/colors/grey'; //azul
import yellow from '@material-ui/core/colors/yellow'; //yellow
import { createMuiTheme, withStyles} from '@material-ui/core/styles';
import Logo from "../../Images/logo.jpg";

//const primary = teal['A400']; // #F44336
//const accent = pink[400]; // #E040FB

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#4AE0B8'),
    backgroundColor: '#4AE0B8',
    color: "white",
    borderLeftColor: teal['A400'],
    borderColor: teal['A400'],
    width: "380px",
    minWidth: '64px',
    boxSizing: "border-box",
    '&:hover': {
      backgroundColor: '#45c4a2',
    },
  },
}))(Button);



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        You Print
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

 

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
      primary: teal['A400'], // #F44336
      accent:pink[400] // #E040FB
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

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container>
          <Grid item xs>
            <img src={Logo} alt="You Print"/>
          </Grid>
        </Grid>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/*<FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
          />*/}

          <ColorButton type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Iniciar Sesión
          </ColorButton>
          {/*
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
              ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
          */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}