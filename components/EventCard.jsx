import { Card, Container, Grid } from '@mui/material'
import { style } from '@mui/system'
import React from 'react'
import styles from './Card.module.scss'
import { motion } from "framer-motion"
import Image from 'next/image'
// import img from '../public/images/sample/event2.jpg'
// import img from "./images/sample/event2.jpg"
import Link from 'next/link'
// import img from './images/sample'
const EventCard = ({eventcard}) => {
    const API_URL="http://localhost:1337"
     console.log(eventcard)
    return (
           <Grid justifyContent ="center" item lg={6} xs={12} >
               <div
              
               >
                  <Card>
                      <div className={styles.cardbox}>
                      

                      <img  className={styles.cardimg} src="https://cdn.pixabay.com/photo/2017/09/06/20/52/disco-2722995_960_720.jpg"    />
                  
                        <div className={styles.cardcontent}>
                         <h3>{eventcard.name}</h3>
                         <p>{eventcard.address}</p>
                       
                           <div  className={styles.link}> 
                               <Link href={`/event/${eventcard.slug}`}   > Details </Link>
                            </div>

                        </div>
                      </div>
                  </Card>
                  </div>
           </Grid>
            
           
    )
}

export default EventCard
