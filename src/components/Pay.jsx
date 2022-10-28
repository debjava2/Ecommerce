import axios from 'axios';
import React,{useState,useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import ButtonCustom from '../ReusableComponents/ButtonCustom';
const KEY="pk_test_51Kp5cOSBpM28OYwGmqj7Mbu2PoIcXOjtXu1tYK3YAPPiqfDMy0rLMVczleN0wo6eCtf6244h9RNYoggLDiLBMAPy00zjHEvYVh";
const Pay = () => {

    const[stripeToken,setStripeToke]=useState(null);

    const onToken=(token)=>{
        setStripeToke(token);
        console.log(token);
    }

    useEffect(()=>{
       const makeRequest=async ()=>{
           try{
              const res= await axios.post("http://localhost:5000/api/checkout/payment",{
                tokenId:stripeToken.id,
                amount:2000
              });
              console.log(res); 
           }catch(err){
               console.log(err);
           }
       }
    },[stripeToken])

  return (
    <div
    style={{
        height:"100vh",
        display: "flex",
        alignItems:"center",
        justifyContent:"center"
    }}
    >
        <StripeCheckout name="Deb Shop"
        image='https://cdn.pixabay.com/photo/2016/04/26/07/57/woman-1353825__340.png'
        billingAddress
        shippingAddress
        description='your total is 20$'
        amount={2000}
        token={onToken}
        stripeKey={KEY}
        >
         <ButtonCustom variant="contained" 
            color="primary" 
            startIcon="Save"
            Title="Pay Now"
            size="large"
           
            />
            </StripeCheckout>
    </div>
  )
}

export default Pay