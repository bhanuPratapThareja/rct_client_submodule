import { Fragment, useMemo, useCallback, useState } from 'react'
import { useLoaderData, Outlet, useNavigate } from "react-router-dom"
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Box } from "@mui/material"

function PostsLoader() {
  const posts = useLoaderData()
  const navigate = useNavigate()
  const [showAddPostButton, setShowAddPostButton] = useState(true)

  const selectPost = useCallback(post => {
    navigate(`/postsLoader/${post.id}`)
  }, [navigate])

  const onAddPost = useCallback(() => {
    setShowAddPostButton(false)
    navigate('/postsLoader/add')
  }, [])

  const renderedPosts = useMemo(() => posts.map((post, i) => {
    return <Fragment key={post.id}>
      <ListItem disablePadding onClick={() => selectPost(post)}>
        <ListItemButton>
          <ListItemIcon>{++i}.</ListItemIcon>
          <ListItemText primary={post.title} style={{ marginLeft: '-1.5rem', textTransform: 'capitalize' }} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </Fragment>
  }), [posts, selectPost])

  if (!posts || !posts.length) {
    return <p>No Posts Found</p>
  }

  if (posts.error) {
    return <p>Posts error: {posts.code} - {posts.message}</p>
  }

  return (
    <>
      <Outlet /><br />
      {showAddPostButton && <Box className="flex">
        <Button variant="contained" onClick={onAddPost}>Add Post</Button>
      </Box>}
      <br /><br />
      <hr />
      <List>{renderedPosts}</List>
    </>
  )
}
export default PostsLoader