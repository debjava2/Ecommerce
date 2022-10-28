import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../images/ecommerce-g17c1cfb16_1920.jpg';
import{sliderItems} from '../data'

const Container = styled.div`
width: 100%;
height:100vh;
display: flex;
position: relative;
overflow: hidden;
`
const Arrow=styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
 left: ${props=>props.direction==="left" && "10px"};
 right: ${props=>props.direction==="right" && "10px"};
cursor: pointer;
margin: auto;
z-index: 2;
`

const Wrapper=styled.div`
height: 100%;
display: flex;
transition: all 1.5s ease;
transform: translateX(${(props) => props.slideIndex * -100}vw);
`
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`
const ImgContainer=styled.div`
height: 100%;
flex: 1;
`
const InfoContainer=styled.div`
flex:1;
padding: 50px;
`
const Image = styled.img`
  height: 65%;
`
const Title=styled.h1`
font-size: 70px;
`
const Desc=styled.p`
 margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`
const Button=styled.button`
padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`

const Slider = () => {
  const[slide,setSlide]=useState(0);
   const handleClick=(direction)=>{
     if(direction=="left"){
      setSlide(slide>0 ? slide-1:2 )
     }else{
      setSlide(slide <2 ? slide+1:0)
     }
    console.log(direction);
   }
  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
        <ArrowLeftOutlined></ArrowLeftOutlined>
        </Arrow> 
        <Wrapper slideIndex={slide}>
        {
        sliderItems.map((item)=>{
          console.log(item);
          return (
            <Slide bg="f5fafd" key={item.id}>
            <ImgContainer>
            {item.id==1 ? <Image src={logo}/>:<Image src={item.img}/>}
            </ImgContainer>
            <InfoContainer>
               <Title>{item.title}</Title>
               <Desc>{item.desc}</Desc>
               <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
          );
    
        })
        }

        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
        <ArrowRightOutlined></ArrowRightOutlined>
        </Arrow>
    </Container>
  )
}

export default Slider