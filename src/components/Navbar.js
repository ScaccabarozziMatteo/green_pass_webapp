import * as React from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";

function Navbar() {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NavLink activeClassName="active" style={{textDecoration: "none"}} exact to='/'>
                        <Button
                            sx={{my: 2, color: 'white', display: 'flex', fontSize: '20px'}}
                            size={"large"}
                        >
                            Green Pass Checker
                        </Button>
                    </NavLink>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <NavLink style={{textDecoration: "none"}} exact to='/checker'>
                            <Button
                                sx={{my: 2, color: 'white', display: 'flex'}}
                            >
                                Check
                            </Button>
                        </NavLink>

                        <NavLink style={{textDecoration: "none"}} exact to='/generator'>
                            <Button
                                sx={{my: 2, color: 'white', display: 'flex'}}
                            >
                                QR Generator
                            </Button>
                        </NavLink>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;