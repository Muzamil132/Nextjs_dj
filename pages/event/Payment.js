import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'
import { Button } from '@mui/material'
const PUB_KEY="pk_test_51IEHJVLo4h35O3RcJrf0iWHZRQDRd8HTU00jTQMUK06H8pKBgiN7CsiWSQekwEsFeIlHunIwRyuinODZjU8zSQVI00N3cY15hX"
const SEC_KEY="sk_test_51IEHJVLo4h35O3RcCPLibz05QblJISf5XtcKrdoSe5NTG3ak9qxpJm5ZqO3nPwNYgxwS5GkidxoR4Lon7JjTvHJd00rM6tq4fu"

const Payment = () => {
   let stripepromise ;

const getStripePromise=()=>{
    if(!stripepromise){
        stripepromise=loadStripe(PUB_KEY)
    }
    return stripepromise
}

   
const Pay =async()=>{
    try{
        const API_URL = "http://localhost:3000"
      const {data} =await axios.post(`${API_URL}/api/stripepayment`,{amount:700})
       const stripe =  await getStripePromise()

       stripe.redirectToCheckout({sessionId:data.session.id})
      console.log(data)
    }
    catch(error){
    console.log(error.message)
    }
}

    return (
        <div>
            <Button   onClick={Pay}>Pay-100</Button>
        </div>
    )
}

export default Payment
