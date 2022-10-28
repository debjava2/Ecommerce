import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useLocation } from "react-router-dom";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
 
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
 
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
 
`;
const Option = styled.option``;


const ProductList = () => {
  const location=useLocation();
  console.log(location.pathname.split("/")[2]);
  const cat=location.pathname.split("/")[2];
  const[filter,setFilter]=useState({});
  const[sort,setSorting]=useState("Newest")
  const[isFilter,setIsFilter]=useState(false);

  const handleFilterChange=(e)=>{
    setIsFilter(true);
    const val=e.target.value;
   setFilter({
    ...filter,
    [e.target.name]:val
   })
  
  }

  
  console.log(filter);
  console.log(sort);
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>Dresses</Title>
        <FilterContainer>
        <Filter><FilterText>FIlter Product</FilterText>
        <Select name="color" onChange={handleFilterChange}>
        <Option disabled >
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
        </Select>
        <Select name="size" onChange={handleFilterChange}>
            <Option disabled >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter><FilterText>Sort Product</FilterText>
        <Select onChange={(e)=>setSorting(e.target.value)}>
            <Option value="Newest" selected>Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
        </FilterContainer>
        <Products cat={cat} filter={filter} sort={sort} isFilter={isFilter}/>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList