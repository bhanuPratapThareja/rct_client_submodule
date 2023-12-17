import classes from './RootLayout.module.css'
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header from '../../Header/Header'
import Footer from '../../Footer/Footer';

function RootLayout() {
 
  return (
    <>
      <CssBaseline />
      <div className={classes.container}>

        <div className={classes.header}>
          <Header />
        </div>

        <Container className={classes.body}>
          <Outlet />
        </Container>

        <div className={classes.footer}>
          <Footer />
        </div>

      </div>
    </>
  )
}
export default RootLayout