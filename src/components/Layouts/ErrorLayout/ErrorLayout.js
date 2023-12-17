import classes from './ErrorLayout.module.css'

export default function ErrorLayout({ children }) {
    return (
        <div className={classes.error__layout}>
            {children}
        </div>
    )
}