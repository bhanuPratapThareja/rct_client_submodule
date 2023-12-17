import { redirect } from "react-router-dom"

export const setUserLoginLocal = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

export const removeUserLogoutLocal = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}

export const getUserLocal = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    return { user, token }
}

export const checkAuthLoader = () => {
    const { user, token } = getUserLocal()
    if(!user || !token) {
        console.log('no user or token')
        return redirect('/auth?mode=login')
    }
    return  null
}