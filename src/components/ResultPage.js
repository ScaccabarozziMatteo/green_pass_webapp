import React, {useEffect} from 'react';
import {Alert, Box, Typography} from "@mui/material";

/* object obtained in personData
{
    name
    address
    surname
    bday
    validity
}
* */

export default function ResultPage({personData}) {
    const [data, setData] = React.useState(personData ? JSON.parse(personData) : {})

    return(
        <React.Fragment>
            <Box>
                <Typography variant='h3'>GP certificate</Typography>
                <Typography variant='h5'>Id: {data.id}</Typography>
                <Typography variant='h5'>Name: {data.name}</Typography>
                <Typography variant='h5'>Surname: {data.surname}</Typography>
                <Typography variant='h5'>Date of birth: {data.bday}</Typography>
                <Typography variant='h5'>Address: {data.address}</Typography>
                {data.validity ?
                <Alert severity="success" variant="filled" style={{margin: '5% 0'}}>Valid!</Alert>
                :
                <Alert severity="error" variant="filled" style={{margin: '5% 0'}}>Not valid!</Alert>}
            </Box>
        </React.Fragment>
    )
}