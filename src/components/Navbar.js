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
        <AppBar position='sticky'>
            <Container maxWidth="xl">
                <Toolbar style={{display:"flex", justifyContent:"flex-start"}} disableGutters>
                    <NavLink style={{textDecoration: "none", marginLeft:"2rem"}} to='/'>
                        <Button
                            sx={{my: 1, color: 'white', display: 'flex'}}
                        >
                            Home
                        </Button>
                    </NavLink>

                    <NavLink style={{textDecoration: "none", marginLeft:"2rem"}} to='/checker'>
                        <Button
                            sx={{my: 1, color: 'white', display: 'flex'}}
                        >
                            Check
                        </Button>
                    </NavLink>

                    <NavLink style={{textDecoration: "none", marginLeft:"2rem"}} to='/generator'>
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