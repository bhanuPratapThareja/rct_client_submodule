import { useEffect } from 'react';
import './App.css';
import AppRoutes from './routes/Routes'
import { useDispatch } from 'react-redux';

import { setInterceptors } from './services/auth-service';
import { userActions } from './store/slices/userSlice';

import { getUserLocal } from './utils/auth';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    setInterceptors()
    setUser()
  }, [])

  const setUser = () => {
    const { user, token } = getUserLocal()
    if(user && token) {
      dispatch(userActions.setUser(user))
    }
  }

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
