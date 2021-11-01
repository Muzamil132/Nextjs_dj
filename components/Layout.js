import React, { Children } from 'react'
import Head from 'next/head'
import AppBarr from '../components/AppBar'
import { Footer } from './Footer'
import Showcase from './Showcase'
const Layout = ({title,children}) => {
    return (
        <div>
            <Head>
            <title>
                {title}
           </title></Head>
           <AppBarr/>
         
            {children}
            <Footer/>
        </div>
    )

    

    
}


export default Layout
