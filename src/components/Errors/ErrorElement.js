import { Link, useRouteError } from "react-router-dom"

function ErrorElement() {
    let error = useRouteError()
    console.log('error element: ', JSON.stringify(error))
    const errorCodeMessage = error.status === 404 ? 'Page Not Found' : error.code === 'ERR_NETWORK' ? 'Please check you network connection' : ''
    return (
        <div style={{ lineHeight: 0.65, textAlign: 'center' }}>
            Error Element
            <h1 style={{ color: 'yellow' }}>{errorCodeMessage}</h1>
            <h2 style={{ color: 'yellow' }}>{error.message}</h2>
            <p>Please navigate to the <Link to="/" style={{ textDecoration: 'underline', margin: '2px' }}>home page</Link></p>
        </div>
    )
}

export default ErrorElement