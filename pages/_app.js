import '../styles/globals.scss'
import  { AuthProvider } from '../context/Authcontext'
function MyApp({ Component, pageProps }) {

            

  return <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider>                    
}

export default MyApp
