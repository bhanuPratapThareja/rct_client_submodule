import { Link, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'
import AuthForm from './AuthForm/AuthForm'

function Auth() {
  const [searchParams] = useSearchParams()
  const isLogin = searchParams.get('mode') === 'login'

  return (
    <Box>
      <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} style={{ float: 'right' }}>
        Switch to {isLogin ? 'signup' : 'login'}
      </Link>
      <br />
      <AuthForm isLogin={isLogin} />
    </Box>
  )
}
export default Auth