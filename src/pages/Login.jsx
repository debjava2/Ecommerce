import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { login } from '../redux/apiCalls';
import { Audio } from 'react-loader-spinner'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &::disabled{
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error=styled.span`
color: red;
`
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(10),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const Login = () => {
  const[userName,setUserName]=useState("");
  const[password,setPassword]=useState("");
  const{isFetching,error}=useSelector((state)=>state.user);
  const[customError,setCustomError]=useState(false);
  const dispatch=useDispatch();
  const classes = useStyles();

  const handelClick=(e)=>{
    e.preventDefault();
    if(userName!="" && password!=""){
    setCustomError(false);
    login(dispatch,{userName,password});
    }
    else
    setCustomError(true);
  }


  return (
    <Container>
   
    <Wrapper>
      <Title>SIGN IN</Title>
      {
       <Backdrop className={classes.backdrop} open={isFetching}>
      <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
    </Backdrop>
    }
      <Form>
        <Input placeholder="username"  onChange={(e)=>setUserName(e.target.value)}/>
        <Input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={handelClick} disabled={isFetching}>LOGIN</Button>
        {
          error && <Error>Something went wrong....</Error>
        }
        {
          customError && <Error>User Name or password cannot be empty....</Error>
        }
        <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
        <Link>CREATE A NEW ACCOUNT</Link>
      </Form>
    </Wrapper>
  </Container>
  )
}

export default Login