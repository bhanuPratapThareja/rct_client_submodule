import classes from "./Footer.module.css"
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Footer() {
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography component="p" sx={{ flexGrow: 1 }}>
                    @copyright
                </Typography>
            </Toolbar>
        </AppBar>
    )
}