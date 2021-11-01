import { Button, Container, Paper } from '@mui/material'
import React,{useState,useEffect} from 'react'
import LongMenu from '../../components/DropDown'

import Layout from '../../components/Layout'
import { parseCookies } from '../../helper/cookieparser'
import styles from '../../pages/event/EventPage.module.scss'


 const Dashboard = ({events,token}) => {


  const [Events,setEvent]=useState(events)

     const deleteFromState=(iid)=>{
      const Eventss = events.filter((ev)=>ev.id!=iid)

      setEvent(Eventss)
     }

    return (
        <div  >
            <Layout>
              
                 <Container className={styles.container} >
                  <Button   href="/Add" elevation={0}  style={{marginTop:"30px" ,color:"#ffff",backgroundColor:"#243447"}} variant="contained" >CREATE EVENT</Button>

                {
                    events.length>0?
                
                <div>

               <h1 >MY EVENTS</h1>


               {
                   Events.map((event)=>(
                    <Paper className={styles.paper}  >
                      <div  className={styles.papercont}>
                         <p>{event.name}</p>
                         <p>{event.venue}</p>
                         <LongMenu  id={event.id} token={token} deleteF={deleteFromState} />
                      </div>
                    
                    </Paper>
                   ))
               }   
               </div>:<h1>
                 YOU DONT HAVE EVENTS

               </h1>

            }
             
              </Container>
             
              
            </Layout>
        </div>
    )
}

export default Dashboard;




export const getServerSideProps=async({req})=>{
    const { token } = parseCookies(req)
    const API_PORT= "https://backend03033.herokuapp.com"
const res =  await fetch(`${API_PORT}/events/me`,{
    headers:{
Authorization:`Bearer ${token}`
    }
})

const   events = await res.json()
 console.log(events)
 if (!token) {

    return {
        redirect: {
            destination: '/account/Login',
            permanent: false
        }
    }
}




    return {
        props:{
           events,token
        }
    }
}