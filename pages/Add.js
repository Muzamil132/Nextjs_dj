import { Container } from '@mui/material'
import { style } from '@mui/system'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import styles from './Add.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from '../helper/cookieparser'
import { TokenList } from 'twilio/lib/rest/api/v2010/account/token'
const Add = ({token}) => {

    console.log(token)
    const router =useRouter()
    const [values, setValues] = useState({
        name: "",
        performer: ""
        ,
        address: "",
        date: "",
        time: "",
        venue: "",
        description: ""

    })

    const handleChange = (e) => {

        const { name, value } = e.target
        console.log(values)
        setValues({ ...values, [name]: value })
    }

    const handlesubmit = async(e) => {
        // const API_URL = "http://localhost:1337"
        // console.log(values)
        e.preventDefault()
        const hasEmpty = Object.values(values).some(val => val == "")
        if (hasEmpty) {
            toast.error("Please Fill all the fields")
        }
        const API_PORT= "https://backend03033.herokuapp.com"
    const res = await fetch(`${API_PORT}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(values),
      })
     
            if(!res.ok){
                console.log(res.status)
                toast.error("Something went wrong")
            }
            else{
                const evt = await res.json()
                router.push("/")

            }
               
          
    


    }
    return (
        <div>
            <Layout title="about">
                <div className={styles.overlay}>
                <Container className={styles.wrapper}>
                    <h1 className={styles.addheading}>ADD EVENT</h1>
                  
                   <ToastContainer/>
                  

                    <form onSubmit={handlesubmit}>
                        <div className={styles.grid}>
                            <div className={styles.inputbox}>
                                <label htmlFor="name" >Name</label>
                                <input   value={values.name} name="name" id="name" onChange={handleChange} className={styles.input} />
                            </div>
                            <div className={styles.inputbox}>
                                <label htmlFor="performer" >Performer</label>
                                <input   value={values.performer}  name="performer" id="performer" onChange={handleChange} className={styles.input} />
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

                </Container>
                </div>
            </Layout>
        </div>
    )
}

export default Add

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)
    console.log(token)

    if (!token) {

        return {
            redirect: {
                destination: '/account/Login',
                permanent: false
            }
        }
    }


   
    return {
      props: {
        token
      },
    }
  }