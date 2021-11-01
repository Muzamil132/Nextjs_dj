import { Button, Container, Input, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React,{useState,useContext} from 'react'
import AuthContext from '../../context/Authcontext'
import Layout from '../../components/Layout'
import styles from './login.module.scss'
import { parseCookies } from  '../../helper/cookieparser'
import { ToastContainer } from 'react-toastify'


const Login = () => {

    const [state,setState]=useState({
        email:"",
        password:""
    })

    const {login} =useContext(AuthContext)

   
     const handleChange=(e)=>{

            const {name,value}=e.target
             setState({...state,[name]:value})
            
     }
     const handleSubmit=(e)=>{
           e.preventDefault()
           console.log(state)
           login(state)
    }
     


    return (
        <div>
            <Layout>
                <Container   className={styles.wrapper}>
                 
                     <form onSubmit={handleSubmit} >
                    <div className={styles.formbox}>
                    <h1>SIGN IN</h1>
                     <img   style={{width:"150px"}} src="https://thumbs.dreamstime.com/b/initial-letter-logo-dj-company-name-blue-magenta-color-circle-swoosh-design-vector-logotype-business-identity-203940740.jpg"   />
                    <div  className={styles.loginbox}>
                         <TextField   name="email" value={state.email} onChange={handleChange}   placeholder="Email" fullWidth style={{backgroundColor:"white"}}  />
                    </div>
                    <div  className={styles.loginbox} style={{backgroundColor:"white"}}    >
                         <TextField name="password" value={state.password} onChange={handleChange}     placeholder="Password" fullWidth  />
                    </div>
                    <div  className={styles.loginbox} style={{backgroundColor:"white"}}     >
                        <Button style={{color:'white',backgroundColor:"#243447"}}   onClick={handleSubmit}   fullWidth className={styles.btn1}      >   SIGN IN</Button>
                    </div>
                    <div className={styles.loginbox}  >
                       <h4>New member?Create Account</h4>   
                       <Button style={{color:'white',backgroundColor:"#243447"}}   href="/account/Register">REGISTER</Button>
                    </div>

                    </div>
                   </form>
                </Container>
            </Layout>
        </div>
    )
}

export default Login




export const getServerSideProps=async(props)=>{
    const {req }=props
    // const API_URL = "http://localhost:1337"
    const { token } = parseCookies(req)
   console.log(token)

   if (token) {

    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}

   

   return {
       props: {
                
           
       }
   }
}
