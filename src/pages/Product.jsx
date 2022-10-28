import React from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { Add } from "@material-ui/icons";
import Remove from '@material-ui/icons/Remove';
import { useLocation } from "react-router-dom";
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { publicRequest} from '../requestMethod'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux/es/exports'
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
 
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
 
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
 
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location=useLocation();
  const cat=location.pathname.split("/")[2];
  const[title,setTitle]=useState("");
  const[discription,setDiscription]=useState("");
  const[cost,setCost]=useState("");
  const[image,setImage]=useState("");
  const[quantity,setQuantity]=useState(1);
  const[product,setProduct]=useState([]);
  const[color,setColor]=useState("");
  const[size,setSize]=useState("");
  const dispatch=useDispatch();
  useEffect(()=>{
    const getProductBasedonPid=async ()=>{
      const token=localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
      const res=await publicRequest.get(`getProdutsBasedOnPid/`+cat,config);
      console.log(res.data);
      setProduct(res.data);
      setTitle(res.data.title)
      setDiscription(res.data.description);
      setCost(res.data.price);
      setImage(res.data.img);
      setColor(res.data.color)
      setSize(res.data.size)
    };
    getProductBasedonPid();
  },[])

  const handelQuantity=(val)=>{
      if(val==="decrease"){
        quantity >1 && setQuantity(quantity-1);
      }
      else{
        setQuantity(quantity+1);
      }
    
    }
 const handelClick=()=>{
  console.log(size);
  dispatch(addProduct({ ...product, quantity, color, size }));
 }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{title}</Title>
          <Desc>
           {discription}
          </Desc>
          <Price>$ {cost}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" onClick={()=>setColor("black")}/>
              <FilterColor color="darkblue" onClick={()=>setColor("darkblue")} />
              <FilterColor color="gray" onClick={()=>setColor("gray")} />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handelQuantity("decrease")}/>
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handelQuantity("increase")}/>
            </AmountContainer>
            <Button onClick={()=>handelClick()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product