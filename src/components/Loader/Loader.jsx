
import React from 'react'
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div style={{margin: '20px auto' }}>
    <FadeLoader   height = {15} color="blue" width={5} radius={2} margin={2}/>
    </div>
  )
}

export default Loader
