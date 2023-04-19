import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div style={{backgroundImage: "url(./banner2.jpg"}}>
      <Container style={{ height:400, display: "flex",
      flexDirection:"column",paddingtop:25,justifyContent:"space-around"}}>
      <div>
        <Typography
        variant='h2'
        style={{fontWeight:"bold",marginBottom:15,fontFamily:"Montserrat"}}>
          Crypto Geeks
        </Typography>
        <Typography
        variant='subtitle2'
        style={{color:"darkgrey",textTransform:"capitalize",fontFamily:"Montserrat"}}>
          Get all the info regarding your favourite cryptocurrencies
        </Typography>
      </div>
      <Carousel/>
      
      </Container>
    </div>
  )
}

export default Banner
