import { lazy, Suspense } from 'react'
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from '../components/Layouts/RootLayout/RootLayout'
import ErrorLayout from '../components/Layouts/ErrorLayout/ErrorLayout'
import ErrorElement from '../components/Errors/ErrorElement'
import Home from '../pages/Home/Home';
import AddPostLoader from '../pages/PostsLoader/AddPostLoader'

// import { fetchPosts } from '../services/posts-service'
import { checkAuthLoader } from '../utils/auth'
import PostsWrapper from '../pages/PostsLoader/PostsWrapper'

const Auth = lazy(() => import('../pages/Auth/Auth'))
const Posts = lazy(() => import('../pages/Posts/Posts'))
const Post = lazy(() => import('../pages/Posts/Post'))
const PostsLoader = lazy(() => import('../pages/PostsLoader/PostsLoader'))
const SelectedPostsLoader = lazy(() => import('../pages/PostsLoader/SelectedPostsLoader'))
const Cars = lazy(() => import('../pages/Cars/Cars'))
const Albums = lazy(() => import('../pages/Albums/Albums'))


const AppRoutes = () => {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <ErrorLayout><ErrorElement /></ErrorLayout>,
            children: [
                { path: '/', element: <Navigate to="/home" /> },
                { path: 'home', element: <Home />, loader: checkAuthLoader },
                { path: 'auth', element: <Auth /> },
                { path: 'posts', element: <Posts /> },
                { path: 'posts:id', element: <Post /> },
                {
                    path: '/postsLoader',
                    element: <PostsWrapper />,
                    loader: checkAuthLoader,
                    children: [
                        {
                            path: '',
                            element: <PostsLoader />,
                            // loader: fetchPosts,
                            loader: meta => import('../services/posts-service').then(m => m.fetchPosts(meta)),
                            id: 'posts-loader',
                            children: [
                                { path: 'name', element: <p>Show name</p> },
                                { path: 'add', element: <AddPostLoader /> },
                                { path: ':id', element: <SelectedPostsLoader /> },
                            ]
                        },
                    ]
                },
                {
                    path: '/cars',
                    element: <Cars />,
                    loader: checkAuthLoader,
                },
                {
                    path: '/albums',
                    element: <Albums />,
                    loader: checkAuthLoader,
                }
            ]
        }
    ])

    return (
        <Suspense fallback="Loading...">
            <RouterProvider router={routes} />
        </Suspense>
    )
}

export default AppRoutes