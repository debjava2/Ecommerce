import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ButtonCustom from '../ReusableComponents/ButtonCustom'
const Conatiner=styled.div`
flex:1;
margin: 3px;
height: 70vh;
position: relative;
`
const Image=styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`
const Info=styled.div`
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
 color:white;
margin-bottom: 20px;
`
const Button = styled.button``
const CategoriesItem = ({item}) => {
    console.log(item.img);
    const handleOnClick=(id)=>{
        console.log(id);
        }
  return (
    <Conatiner>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img}/>
        <Info>
        <Title>{item.title}</Title>
            <ButtonCustom variant="contained" 
            color="secondary" 
            startIcon="Save"
            Title="Buy Now"
            size="large"
            onClick={()=>handleOnClick(item.id)}
            />
        </Info>
        </Link>
    </Conatiner>
  )
}

export default CategoriesItem