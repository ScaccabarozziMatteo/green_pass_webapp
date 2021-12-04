import React from 'react'
import QrReader from 'react-qr-reader'
import {Box} from "@mui/material";

function Checker() {

    const [result, setResult] = React.useState('No result')

    function handleScan(data) {
        setResult(data);
    }


    function handleError(err) {
        console.error(err)
    }

    return (
        <div>
            <Box maxWidth={'500px'}>
                <QrReader
                    delay={0}
                    facingMode={'environment'}
                    onError={handleError}
                    onScan={handleScan}
                    style={{width: '100%'}}
                />
            </Box>
            <p>{result}</p>
        </div>
    )
}

export default Checker;