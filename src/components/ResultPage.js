import React from 'react';
import {Alert, Box, Typography} from "@mui/material";

export default function ResultPage(props) {

    const [data, setData] = React.useState({
        name: JSON.parse(props.data).name,
        surname: JSON.parse(props.data).surname,
        birthdate: JSON.parse(props.data).birthdate,
        validity: JSON.parse(props.data).validity
    })

    return(
        <React.Fragment>
            <Box>
                <Typography variant='h3'>GP certificate</Typography>
                <Typography variant='h5'>Name: {data.name}</Typography>
                <Typography variant='h5'>Surname: {data.surname}</Typography>
                <Typography variant='h5'>Date of birth: {data.birthdate}</Typography>
                {data.validity ?
                <Alert severity="success" variant="filled" style={{margin: '5% 0'}}>Valid!</Alert>
                :
                <Alert severity="error" variant="filled" style={{margin: '5% 0'}}>Not valid!</Alert>}
            </Box>
        </React.Fragment>
    )
}