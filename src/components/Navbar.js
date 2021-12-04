import * as React from 'react';
import {
    AppBar,
    Button,
    Container,
    Toolbar
} from "@mui/material";
import {NavLink} from "react-router-dom";

function Navbar() {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NavLink style={{textDecoration: "none"}} to='/'>
                        <Button
                            sx={{my: 1, color: 'white', display: 'flex', fontSize: '20px'}}
                            size={"large"}
                        >
                            Green Pass Checker
                        </Button>
                    </NavLink>

                        <NavLink style={{textDecoration: "none"}} to='/checker'>
                            <Button
                                sx={{my: 1, color: 'white', display: 'flex'}}
                            >
                                Check
                            </Button>
                        </NavLink>

                        <NavLink style={{textDecoration: "none"}} to='/generator'>
                            <Button
                                sx={{my: 1, color: 'white', display: 'flex'}}
                            >
                                QR Generator
                            </Button>
                        </NavLink>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;