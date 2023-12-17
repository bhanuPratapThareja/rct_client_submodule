import classes from './Cars.module.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, TextField, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@mui/material'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'

import { fetchCars, deleteCar } from '../../store/thunks/carsThunk'

function CarsList() {
    const dispatch = useDispatch()
    const carsList = useSelector(state => state.carsList)

    useEffect(() => {
        dispatch(fetchCars())
    }, [])

    const totalCost = carsList.cars.reduce((acc, curr) => {
        return acc += curr.cost
    }, 0)

    const generateCarsList = carsList.cars.map(car => {
        const { name, cost, id } = car
        return <ListItem className={classes.list_item} key={id}>
            <ListItemAvatar>
                <Avatar>
                    <DirectionsCarIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Box>
                        {name}
                    </Box>
                }
                secondary={`$${cost}`}
                style={{ fontWeight: '900' }}
            />
            <Button
                variant="outlined"
                className={classes.delete_icon}
                onClick={() => dispatch(deleteCar(id))}
            >
                Delete
            </Button>
        </ListItem>
    })

    return (
        <>
            <Grid container item>
                <Grid item xs={6} sm={8} className="flex items-center">
                    <Box className={classes.my_cars}>
                        <p>My Cars</p>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        name="searchTerm"
                        label="Search"
                        variant="filled"
                        className="w-full"
                        size="small"
                    />
                </Grid>
            </Grid>
            <br />
            <List>
                {generateCarsList}
            </List>

            <Box className={classes.total_cost}>
                <h3>Total Cost: ${totalCost}</h3>
            </Box>
        </>
    )
}
export default CarsList