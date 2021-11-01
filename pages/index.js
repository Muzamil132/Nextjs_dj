import Head from 'next/head'
import Image from 'next/image'
import EventCard from '../components/EventCard'
import { Card, Container, Grid } from '@mui/material'

import React ,{useEffect}from 'react'
import styles from '../components/Card.module.scss'
import Layout from '../components/Layout'
import Showcase from '../components/Showcase'
// import styles from '../styles/Home.module.css'
// import {API_URL} from '../next.config'

export default function Home({events}) {
  
  const fetchdata =async()=>{
    const data =await fetch(`${process.env.API_PORT}/events`)
    const  events =await data.json()
    console.log(events)
}
console.log('I am good')
  useEffect(() => {
    
     
    fetchdata()
  }, [])


  console.log(events)

  return (
    <div>
      <Layout>
      <Showcase/>
      <Container className={styles.container} >
            {
               events.length==0 && <h1>NO EVENTS IS THEIR</h1>
            }
          <Grid container  spacing={4} >
            
                {
                 events.map((eventcard)=>{
                   return <EventCard eventcard={eventcard} />
                 })
                }
               </Grid>
          </Container>

      </Layout>

    

    
    </div>
  )
}

export const getServerSideProps =async()=>{
const API_PORT= "https://backend03033.herokuapp.com"
  const res =await fetch(`${API_PORT}/events`)

  const events = await res.json()
  console.log(events)
  return {
    props:{
      events
    }

    
  }


}