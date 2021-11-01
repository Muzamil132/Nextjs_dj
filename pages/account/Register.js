import { Button, Container, Input, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React ,{useState,useContext}from 'react'
import AuthContext from '../../context/Authcontext'
import Layout from '../../components/Layout'
import styles from './login.module.scss'
// import { getCookieParser } from 'next/dist/server/api-utils'
import { parseCookies } from '../../helper/cookieparser'

const Register = () => {
      
    const [state,setState]=useState({
        username:"",
        email:"",
        password:""
    })

    const {register} =useContext(AuthContext)

   
     const handleChange=(e)=>{

            const {name,value}=e.target
             setState({...state,[name]:value})
            
     }
     const handleSubmit=(e)=>{
           e.preventDefault()
          register(state)
         
    }
     

    return (
        <div>
        <Layout>
            <Container   className={styles.wrapper}>
               
                <div className={styles.formbox}>
                <h1>SIGN UP</h1>
                 <img   style={{width:"150px"}} src="https://thumbs.dreamstime.com/b/initial-letter-logo-dj-company-name-blue-magenta-color-circle-swoosh-design-vector-logotype-business-identity-203940740.jpg"   />
                 <div  className={styles.loginbox}>
                         <TextField   name="username" value={state.username} onChange={handleChange}   placeholder=" username" fullWidth style={{backgroundColor:"white"}}  />
                    </div>
                 <div  className={styles.loginbox}>
                         <TextField   name="email" value={state.email} onChange={handleChange}   placeholder="Email" fullWidth style={{backgroundColor:"white"}}  />
                    </div>
                    <div  className={styles.loginbox} style={{backgroundColor:"white"}}    >
                         <TextField name="password" value={state.password} onChange={handleChange}     placeholder="Password" fullWidth  />
                    </div>
                    <div  className={styles.loginbox} style={{backgroundColor:"white"}}     >
                        <Button style={{color:'white',backgroundColor:"#243447"}}  onClick={handleSubmit}   fullWidth className={styles.btn1}      >   SIGN UP</Button>
                    </div>
                </div>
               
            </Container>
        </Layout>
    </div>
    )
}

export default Register

export const getServerSideProps=async(props)=>{
    const {req }=props
 
    const { token } = parseCookies(req)

    if (token) {

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
   

   return {
       props:{
            
            
       }
   }
}
