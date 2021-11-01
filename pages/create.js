import React ,{useEffect} from 'react'
import { parseCookies } from '../helper/cookieparser'

const Craete = ({token}) => {
    const API_URL = "http://localhost:1337"
    useEffect(()=>{


        Addcat()

    },[])

    const Addcat =async()=>{
        const res = await fetch(`${API_URL}/events/me`, {
            method: 'GET',
            headers: {
             
               Authorization: `Bearer ${token}`,
            },
          
          })

          const data =await res.json()
          console.log(data)
    }
    return (
        <div>
            
        </div>
    )
}

export default Craete


export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)
    console.log(token)
   
    return {
      props: {
        token,
      },
    }
  }