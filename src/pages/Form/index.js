import React, { useState } from 'react';
import ShareForm from './ShareForm'
import RateForm from './RateForm'


const Home = () => {
  return(
    <div className="home">
      <ShareForm />
      <RateForm />
    </div>


  )
}

export default Home;