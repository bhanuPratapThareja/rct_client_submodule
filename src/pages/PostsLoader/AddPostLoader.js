import { useState, useRef, useEffect } from 'react'
import { Grid, TextField, Box, Button } from '@mui/material'

function AddPostLoader() {
    const fileInputRef = useRef()
    const [post, setPost] = useState({
        id: '',
        userId: '',
        title: '',
        body: '',
        file: ''
    })

    const handleInputChange = e => {
        const { name, value, type } = e.target
        setPost(post => ({ ...post, [name]: type === 'number' ? +value : value }))
    }

    const addImage = e => {
        setPost(post => ({ ...post, file: e.target.files[0] }))
    }

    const onSubmitPost = e => {
        e.preventDefault()
        console.log(post)
    }

    return (
        <form noValidate onSubmit={onSubmitPost}>
            <br />
            <Grid container item>
                <Grid item xs={12} sm={8}>
                    <TextField
                        label="id"
                        name="id"
                        value={post.id}
                        type="number"
                        required={true}
                        variant="standard"
                        className="w-full"
                        onChange={e => handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={12} sm={8}>
                    <TextField
                        label="User Id"
                        name="userId"
                        value={post.userId}
                        type="number"
                        required={true}
                        variant="standard"
                        className="w-full"
                        onChange={e => handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={12} sm={8}>
                    <TextField
                        label="Title"
                        name="title"
                        value={post.title}
                        type="text"
                        required={true}
                        variant="standard"
                        className="w-full"
                        onChange={e => handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={12} sm={8}>
                    <TextField
                        label="Body"
                        name="body"
                        value={post.body}
                        type="text"
                        required={false}
                        variant="standard"
                        className="w-full"
                        onChange={e => handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
            <br />

            <Grid container>
                <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/* <Button onClick={() => fileInputRef.current.click()}>Add Image</Button> */}
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={addImage}  />
                </Grid>
            </Grid>

            <br />
            <Box className="flex">
                <Button variant="contained" type="submit">Submit Post</Button>
            </Box>
        </form>
    )
}
export default AddPostLoader