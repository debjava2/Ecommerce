import { Add, Remove } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react'
import { useEffect } from 'react'
import { userRequest } from '../requestMethod'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Container = styled.div``;


const Wrapper = styled.div`
  padding: 20px;
 
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
 
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
 
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const BR = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;


const Cart = () => {
  const cart=useSelector((state)=>state.cart);
  const[stripeToken,setStripeToken]=useState(null);
  const navigate = useNavigate();
  const onToken=(token)=>{
    setStripeToken(token);
  }
  console.log(stripeToken);

  useEffect(() => {
    const makeRequest = async () => {
  await axios.post("http://localhost:8080/api/payment/charge", "", { headers: {
  token: stripeToken.id,
  amount: cart.total,
},}).then((res) => {
  
   navigate("/success", {
    stripeData: res.data,
    state:{"cart": cart},
    products: cart, });
   }).catch((error) => {
   alert(error);
   });
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);


  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>Your Bag</Title>
            <Top>
                <TopButton>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist(0)</TopText>
                </TopTexts>
                <TopButton>CHECKOUT NOW</TopButton> 
            </Top>
            <Bottom>
                <Info>
                 {
                  cart.products.map((product)=>(
                    <Product>
                    <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                        <ProductName><b>Product: </b>{product.title}</ProductName>
                        <ProductId><b>Prouduct Id: </b> {product.productId}</ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize><b>Size : </b> {product.size}</ProductSize>
                    </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                        <Add/>
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <Remove/>    
                        </ProductAmountContainer> 
                        <ProductPrice>${product.price*product.quantity}</ProductPrice>
                    </PriceDetail>
                </Product>
                  ))
                 }
                  
                    <Hr/>

                </Info>
                <Summary>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                  <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText type="total">Total</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                  </SummaryItem>
                  <StripeCheckout
                  name="Next Generation ShopingCart"
                  image='https://avatars.githubusercontent.com/u/1486366?v=4'
                  billingAddress
                  shippingAddress
                  description={`Your Total is $${cart.total}`}
                  amount={cart.total*100}
                  token={onToken}
                  stripeKey='pk_test_51Kp5cOSBpM28OYwGmqj7Mbu2PoIcXOjtXu1tYK3YAPPiqfDMy0rLMVczleN0wo6eCtf6244h9RNYoggLDiLBMAPy00zjHEvYVh'
                  
                  >
                  <Button>CHECKOUT NOW</Button>
                  </StripeCheckout>

                </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart