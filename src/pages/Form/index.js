import React, { useState } from 'react';
import ShareForm from './ShareForm'
import RateForm from './RateForm'
// import { Counter } from '../../features/counter/Counter';


const Home = () => {
  return(
    <div className="home">
      <ShareForm />
      <RateForm />
      {/* <Counter /> */}
    </div>


  )
}

export default Home;