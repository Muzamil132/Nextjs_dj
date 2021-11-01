import { Typography } from '@mui/material'
import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import styled from 'styled-components';

export const Center =styled.div`




`

export const Footer = () => {



    


   
    return (
        <div className={styles.wrapper}   >
            <div className={styles.box}>
            <h5>Copyright &copy; DJ EVENTS 2021 </h5>

            <p className={styles.link}>
           <Link href="/">
           <a>
          DJEVENTS
         </a>
           </Link>
                   
                 
            </p>
            </div>
            
        </div>
    )
}
