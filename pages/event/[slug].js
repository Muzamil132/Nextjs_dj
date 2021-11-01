import { Button, Container } from '@mui/material'
import React from 'react'
import Layout from '../../components/Layout'
import styles from './EventPage.module.scss'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {toast,ToastContainer} from 'react-toastify'
const EventPage = ({ events }) => {
    
  
     const router=useRouter()
           



    return (
        <Layout>
            <div className={styles.wrapper}>
              
                <ToastContainer/>
              <div className={styles.cont} >
                     
                    <h2>{events.name}</h2>
                    <img className={styles.image} src={events.image &&      API_URL+     events.image.formats.thumbnail.url} />

                    <h3>Performers:</h3>
                    <p>{events.performers}</p>
                    <h3>Description:</h3>
                    <p>{events.description}</p>
                    <h3>Venue: {events.venue}</h3>
                    <p>{events.address}</p>

                    {/* <EventMap evt={evt} /> */}

                    <Link href="/">
                        <a className={styles.back}>{'<'} Go Back</a>
                    </Link>
            


              </div>
               


            </div>
        </Layout>

    )
}

// export const getStaticPaths = async () => {

//     const API_PORT= "https://backend03033.herokuapp.com"

//     const res = await fetch(`${API_PORT}/events`)

//     const events = await res.json()
//     console.log(events)
//     const paths = events.map((evt => (
//         {
//             params: {
//                 slug: evt.slug
//             },


//         }
//     )))
//     // console.log(paths)
//     return {
//         paths, fallback: false
//     }
// }

export const getServerSideProps = async ({ query: { slug } }) => {

    const API_PORT= "https://backend03033.herokuapp.com"

    const res = await fetch(`${API_PORT}/events?slug=${slug}`)

    const events = await res.json()

    // console.log(events)

    return {
        props: {
            events: events[0]
        },
    

    }
}



export default EventPage
