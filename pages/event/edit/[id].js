import { Button, Container } from '@mui/material'
// import { style } from '@mui/system'
import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import styles from '../../Add.module.scss'


import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router'
import Modal from '../../../components/Modal'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from '../../../helper/cookieparser'
const Editevent = ({event,token}) => {
//    console.log(token)
    const [show,setShow]=useState(false)
    const router =useRouter()
     const {query:{id}} = router
    //  console.log(id)
    const [values, setValues] = useState({
        name: event.name,
        performers: event.performers
        ,
        address: event.address,
        date: event.date,
        time:event.time,
        venue: event.venue,

        description:event.description

    })

    const handleChange = (e) => {

        const { name, value } = e.target
        console.log(values)
        setValues({ ...values, [name]: value })
    }

    const handlesubmit = async(e) => {
        const API_PORT= "https://backend03033.herokuapp.com"
        console.log(values)
        e.preventDefault()
        const hasEmpty = Object.values(values).some(val => val == "")
        if (hasEmpty) {
            toast.error("Please Fill all the fields")
        }
      
        try{
               
    const res = await fetch(`${API_PORT}/events/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify(values),
      })
            const event =await res.json()
            // router.push(`/event/${event.slug}`)
        }
        catch(error){
          console.log(error)

        }
      

  

    }
    return (
        <div>
            <Layout title="about">
                <div className={styles.overlay}>
                <Container className={styles.wrapper}>
                    <h1 className={styles.addheading}>Event EVENT</h1>
                  
                   <ToastContainer/>
                       <Modal  show={show} onClose={()=>setShow(false)} >
                       <h1>Muzamil</h1>
                       </Modal>

                    <form onSubmit={handlesubmit}>
                        <div className={styles.grid}>
                            <div className={styles.inputbox}>
                                <label htmlFor="name" >Name</label>
                                <input   value={values.name} name="name" id="name" onChange={handleChange} className={styles.input} />
                            </div>
                            <div className={styles.inputbox}>
                                <label htmlFor="performer" >Performer</label>
                                <input   value={values.performers}  name="performers" id="performer" onChange={handleChange} className={styles.input} />
                            </div>
                            <div className={styles.inputbox}>
                                <label htmlFor="address" >Address</label>
                                <input value={values.address}    name="address" id="address" onChange={handleChange} className={styles.input} />
                            </div>
                            <div className={styles.inputbox}>
                                <label htmlFor="venue" >Venue</label>
                                <input     value={values.venue}  name="venue" id="venue" onChange={handleChange} className={styles.input} />
                            </div>
                            <div className={styles.inputbox}>
                                <label htmlFor="time" >Time</label>
                                <input value={values.time}      name="time" id="time" onChange={handleChange} className={styles.input} />
                            </div>
                            <div className={styles.inputbox}>
                                <label htmlFor="date" >Date</label>
                                <input type="date"   value={values.date}         name="date" id="date" onChange={handleChange} className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.inputbox}>
                            <label htmlFor="description" >Description</label>
                            <input     value={values.description}  style={{ height: "70px" }} type="decsription" onChange={handleChange} className={styles.descbox} name="description" id="description" className={styles.input} />

                        </div>
                        <button onClick={handlesubmit} className={styles.btn}  >Submit</button>
                    </form>
                      <Button onClick={()=>setShow(!show)}    className={styles.btn1} >Upload Image</Button>
                </Container>
                </div>
            </Layout>
        </div>
    )
}

export default Editevent


export const getServerSideProps=async(props)=>{
    const {req }=props
    // const API_URL = "http://localhost:1337"
    const { token } = parseCookies(req)
//    console.log(token)
const API_PORT= "https://backend03033.herokuapp.com"
    const res =await fetch(`${API_PORT}/events/${props.params.id}`,
    {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    
    )
    const event =await res.json()

    if (!token) {

        return {
            redirect: {
                destination: '/account/Login',
                permanent: false
            }
        }
    }




    // console.log(event)
    //
   return {
       props:{
            event:event,
            token
       }
   }
}
