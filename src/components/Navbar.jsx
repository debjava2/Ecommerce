import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux/es/exports'
import { loginFailure, loginSucess,loginStart,logOut } from '../redux/userRedux'
const Container = styled.div`
height:60px;
`

const Wrapper= styled.div`
padding: 10px 20px;
display: flex;
align-items: center;
justify-content: space-between  ;
`
const Left=styled.div`
flex: 1;
display: flex;
align-items: center;
`
const Center=styled.div`
flex: 1;
`
const Right=styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
`
const Language=styled.span`
font-size: 14px;
cursor: pointer;
display: flex;
`
const SearchContainer=styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 15px;
padding: 1px;
`
const Input = styled.input`
border: none;
`
const Logo=styled.h1`
font-weight: bold;
text-align: center;
`

const MenuItem=styled.div`
font-size: 14px;
cursor: pointer;
margin:25px;
`


const Navbar = () => {
  const dispatch=useDispatch();
  const handleClick=()=>{
    dispatch(logOut());
   
  }
  const quantity = useSelector(state=>state.cart.quantity)
  return (
    <Container>
        <Wrapper>
        <Left><Language>English
            <SearchContainer>
                <Input/>
                <SearchIcon></SearchIcon>
            </SearchContainer>
            </Language></Left>
        <Center><Logo>LMAO..</Logo></Center>
        <Right>
        <MenuItem>Register</MenuItem>
        <MenuItem>Sign In</MenuItem>
        <MenuItem onClick={handleClick}>Log out</MenuItem>
        <Link to="/cart">
        <MenuItem>
        <Badge badgeContent={""+quantity} color="primary">
        <ShoppingCartOutlinedIcon />
       </Badge>
        </MenuItem>
        </Link>

        </Right>
        </Wrapper>
        </Container>
  )
}

export default Navbar