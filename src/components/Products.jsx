import React from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data';
import Product from './Product';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Container =styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
`
const Products = ({cat,filter,sort,isFilter}) => {
    const[products,setProducts]=useState([]);
    const[filterProduct,setFilterProduct]=useState([]);
    useEffect(()=>{

        const token=localStorage.getItem("token");
     const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

        const getProduct=async ()=>{
            try{
                let url="";
                if(cat==null || cat==""){
                    url=`http://localhost:8080/api/getProduts`;
                }
                else{
                    url=`http://localhost:8080/api/getProdutsBasedOnCategory/`+cat;
                }
            const res=await axios.get(url,config);
            console.log(res);
            setProducts(res.data);
            }catch(e){
                console.log(e);
            }
        };
        getProduct();
    },[cat])

    useEffect(()=>{
         cat && setFilterProduct(
             products.filter(item=>Object.entries(filter).
             every(([key,value])=>item[key].includes(value))
         ))
        
    },[products,cat,filter])
    useEffect(()=>{
        if(sort==="newest"){
            setFilterProduct((prev)=>[...prev].sort((a,b)=>a.createdAt-b.createdAt))
        }
       else if(sort==="asc"){
        setFilterProduct((prev)=>[...prev].sort((a,b)=>a.price-b.price))
        }
        else if(sort==="desc"){
            setFilterProduct((prev)=>[...prev].sort((a,b)=>b.price-a.price)
            )
        }
    },[sort])
    console.log(filterProduct);
  return (
    
    <Container>
        
        {
            cat ? filterProduct.map((item)=>{
                return(
                    <Product item={item} key={item.id}/>
                );
            }):products.slice(0,8).map((item)=>{
                return(
                    <Product item={item} key={item.id}/>
                );
            })

            
        }
        </Container>
  )
}

export default Products