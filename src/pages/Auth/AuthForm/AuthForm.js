import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Typography, Grid, TextField, Button, FormControl, FormLabel, InputLabel, FormControlLabel, Checkbox, RadioGroup, Radio, Select, MenuItem } from '@mui/material'

import { validateInput } from '../../../utils/validations'
import { createUser } from '../../../store/thunks/userThunk'
import { setUserLoginLocal } from '../../../utils/auth';

const INITIAL_USER_DATA = {
  userName: {
    label: 'User Name',
    name: 'userName',
    value: '',
    type: 'text',
    required: true,
    error: '',
    minLength: 4
  },
  password: {
    label: 'Password',
    name: 'password',
    value: '',
    type: 'password',
    required: true,
    error: '',
    minLength: 8
  },
  email: {
    label: 'Email',
    name: 'email',
    value: '',
    type: 'email',
    required: false,
    error: ''
  },
  aquisitionChannel: {
    label: 'Acquisition Channel',
    name: 'aquisitionChannel',
    type: 'checkbox',
    required: false,
    error: '',
    checkboxes: [
      {
        label: 'Google',
        name: 'google',
        checked: false
      },
      {
        label: 'Friend',
        name: 'friend',
        checked: false
      },
      {
        label: 'Others',
        name: 'others',
        checked: false
      },
    ]
  },
  gender: {
    label: 'Gender',
    name: 'gender',
    value: 'male',
    type: 'radio',
    required: false,
    error: '',
    radios: [
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ]
  },
  profile: {
    label: 'Profile',
    name: 'profile',
    value: '',
    type: 'select',
    required: false,
    options: [
      {
        label: 'Select a profile',
        value: '',
        disabled: true
      },
      {
        label: 'Administrator',
        value: 'admin',
        disabled: false
      },
      {
        label: 'Developer',
        value: 'dev',
        disabled: false
      },
      {
        label: 'Guest',
        value: 'guest',
        disabled: false
      },
    ]
  },
  tnc: {
    label: 'Terms and conditions',
    name: 'tnc',
    type: 'checkbox',
    required: false,
    error: '',
    checkboxes: [
      {
        label: 'Terms and conditions',
        name: 'tnc',
        checked: false
      }
    ]
  },
  form: {
    error: false
  }
}

const userReducer = (state, action) => {
  const { name, value, checked, parentName, error } = action.payload
  const newState = { ...state }
  switch (action.type) {
    case 'INPUT_CHANGE':
      const newInput = newState[name]
      newInput.value = value
      newInput.error = ''
      return newState
    case 'CHECKBOX_CHANGE':
      const newCheckbox = newState[parentName]['checkboxes'].find(box => box.name === name)
      newCheckbox.checked = checked
      newState[parentName].error = ''
      return newState
    case 'INPUT_VALIDATE':
      const validatedInput = newState[name]
      validatedInput.error = error
      return newState
    case 'RESET_FORM':
      return { ...INITIAL_USER_DATA }
    default:
      return state
  }
}

function AuthForm(props) {
  const [user, dispatch] = useReducer(userReducer, INITIAL_USER_DATA)
  const dipatchThunk = useDispatch()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isSubmitting, error } = useSelector(state => state.user)

  const handleInputChange = e => {
    let { name, value } = e.target
    const payload = { name, value }
    dispatch({ type: 'INPUT_CHANGE', payload })
  }

  const handleValidateInput = e => {
    let { name, value } = e.target
    const error = validateInput(name, value, user[name])
    const payload = { name, value, error }
    dispatch({ type: 'INPUT_VALIDATE', payload })
  }

  const handleCheckboxChange = (e, parentName) => {
    let { name, checked } = e.target
    const payload = { parentName, name, checked }
    dispatch({ type: 'CHECKBOX_CHANGE', payload })
  }

  const handleSubmit = e => {
    e.preventDefault()
    let formError = false
    for (let name in user) {
      const error = validateInput(name, user[name].value, user[name])
      if (error) formError = true;
      const payload = { name, value: user[name].value, error }
      dispatch({ type: 'INPUT_VALIDATE', payload })
    }

    if (formError) {
      console.log('Form is invalid')
      return
    }

    const submitUser = JSON.parse(JSON.stringify(user))

    function getCheckboxes(name) {
      const checkboxes = submitUser[name].checkboxes
      checkboxes.forEach(box => delete box.label)
      return checkboxes
    }


    const { userName, password, email, gender, profile } = submitUser
    const userData = {
      userName: userName.value,
      password: password.value,
      email: email.value,
      aquisitionChannel: getCheckboxes('aquisitionChannel'),
      gender: gender.value,
      profile: profile.value,
      tcn: getCheckboxes('tnc')
    }

    const mode = searchParams.get('mode')
    const request = { userData, mode }
    dipatchThunk(createUser(request))
      .unwrap()
      .then(response => {
        if (mode === 'signup') {
          navigate('/auth?mode=login')
        } else {
          setUserLoginLocal(response.user, response.token)
          navigate('/')
        }
      })
      .catch(err => {
        console.log('errLL ', err)
      })
  }
  
  return (
    <>
      <form noValidate onSubmit={e => handleSubmit(e)}><br />
        <Typography variant="h5">{props.isLogin ? 'Login' : 'Sign Up'}</Typography>
        <Grid container spacing={3}>

          <Grid container item>
            <Grid item xs={0} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label={user.userName.label}
                name={user.userName.name}
                value={user.userName.value}
                type={user.userName.type}
                required={user.userName.required}
                minLength={user.userName.minLength}
                variant="standard"
                className="w-full"
                onChange={e => handleInputChange(e)}
                onBlur={e => handleValidateInput(e)}
              />
              <small className="input__error">{user.userName.error}</small>
            </Grid>
            <Grid item xs={0} sm={2}></Grid>
          </Grid>

          <Grid container item>
            <Grid item xs={0} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label={user.password.label}
                name={user.password.name}
                value={user.password.value}
                type={user.password.type}
                required={user.password.required}
                variant="standard"
                className="w-full"
                onChange={e => handleInputChange(e)}
                onBlur={e => handleValidateInput(e)}
              />
              <small className="input__error">{user.password.error}</small>
            </Grid>
            <Grid item xs={0} sm={2}></Grid>
          </Grid>

          {!props.isLogin && <>
            <Grid container item>
              <Grid item xs={0} sm={2}></Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  label={user.email.label}
                  name={user.email.name}
                  value={user.email.value}
                  type={user.email.type}
                  required={user.email.required}
                  variant="standard"
                  className="w-full"
                  onChange={e => handleInputChange(e)}
                  onBlur={e => handleValidateInput(e)}
                />
                <small className="input__error">{user.email.error}</small>
              </Grid>
              <Grid item xs={0} sm={2}></Grid>
            </Grid>

            <Grid container item>
              <Grid item xs={2} sm={2}></Grid>
              <Grid item xs={8} sm={6}>
                <label>{user.aquisitionChannel.label}</label>
                {user.aquisitionChannel.checkboxes.map(checkbox =>
                  <FormControlLabel
                    key={checkbox.name}
                    label={checkbox.label}
                    name={checkbox.name}
                    checked={checkbox.checked}
                    style={{ display: 'flex' }}
                    control={<Checkbox
                      onChange={e => handleCheckboxChange(e, user.aquisitionChannel.name)}
                    />}
                  />)}
              </Grid>
              <small className="input__error">{user.aquisitionChannel.error}</small>
              <Grid item xs={2} sm={3}></Grid>
            </Grid>

            <Grid item xs={0} sm={2}></Grid>
            <Grid item xs={6} sm={4}>
              <FormControl style={{ display: 'flex' }}>
                <FormLabel style={{ display: 'flex' }}>{user.gender.label}</FormLabel>
                <RadioGroup row name={user.gender.name} value={user.gender.value} onChange={e => handleInputChange(e)}>
                  {user.gender.radios.map((radio, i) => <FormControlLabel
                    key={i}
                    control={<Radio />}
                    label={radio.label}
                    value={radio.value}
                    labelPlacement="start"
                  />)}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={4}>
              <FormControl fullWidth>
                <InputLabel>{user.profile.label}</InputLabel>
                <Select
                  name={user.profile.name}
                  type={user.profile.type}
                  value={user.profile.value}
                  onChange={e => handleInputChange(e)}
                >
                  {user.profile.options.map((option, i) =>
                    <MenuItem
                      key={i}
                      value={option.value}
                      disabled={option.disabled}>
                      {option.label}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <small className="input__error">{user.profile.error}</small>
            </Grid>
            <Grid item xs={0} sm={2}></Grid>


            <Grid container item>
              <Grid item xs={2} sm={2}></Grid>
              <Grid item xs={8} sm={6}>
                <FormControlLabel
                  label={user.tnc.label}
                  control={<Checkbox
                    name={user.tnc.name}
                    required={user.tnc.required}
                    checked={user.tnc.checked}
                    onChange={e => handleCheckboxChange(e, user.tnc.name)}
                  />}
                  style={{ display: 'flex' }}
                />
              </Grid>
              <Grid item xs={2} sm={3}></Grid>
            </Grid>
          </>}
          {/* <Grid container item style={{ marginTop: '0.5rem' }}> */}
          <Grid item xs={0} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={(!user.tnc.checkboxes[0].checked || isSubmitting) && !props.isLogin}
            >
              {props.isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Grid>
          <Grid item xs={0} sm={3}></Grid>
        </Grid>
        {/* </Grid> */}
        {/* <small className="input__error">{'error'}</small> */}
      </form>
      
    </>
  )
}
export default AuthForm