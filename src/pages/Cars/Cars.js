import { useDispatch, useSelector } from 'react-redux'
import { Grid, TextField, Button } from '@mui/material'

import CarsList from './CarsList'
import { carsInputActions } from '../../store/slices/carsSlice'
import { addCarAsync } from '../../store/thunks/carsThunk'

function Cars() {
  const dispatch = useDispatch()

  const car = useSelector(state => state.carsForm)

  const handleChange = e => {
    const { name, value } = e.target
    dispatch(carsInputActions.changeInput({ name, value }))
  }

  const onAddCar = e => {
    e.preventDefault()
    // dispatch(addCar(car))
    // .unwrap()
    //   .then(res => {
    //     console.log(car)
    //     dispatch(carsListActions.addCarSync(car))
    //   })
    dispatch(addCarAsync(car))
    // .unwrap()
    // .then((res) => console.log('success: ', res))
    // .catch((err) => console.log('error: ', err))
    // .finally(() => console.log('finally'))
  }


  return (
    <>
      <form noValidate onSubmit={onAddCar}><br />
        <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>

          <Grid item xs={12} sm={4}>
            <TextField
              name="name"
              label="Car Name"
              variant="outlined"
              className="w-full"
              size="small"
              value={car.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              name="cost"
              type="number"
              label="Car cost"
              variant="outlined"
              className="w-full"
              size="small"
              onChange={handleChange}
              value={car.cost || ''}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              disabled={car.loading}
            >
              Submit
            </Button>
          </Grid>

        </Grid>
      </form>
      <hr style={{ border: '1px solid #ddd', width: '100%', marginTop: '2rem' }} />
      <br />
      <CarsList />
    </>

  )
}
export default Cars