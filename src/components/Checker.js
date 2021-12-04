import React from 'react'
import QrReader from 'react-qr-reader'
import {Box, Button} from "@mui/material";

function Checker() {

    const [result, setResult] = React.useState('')
    const [hideReader, setHideReader] = React.useState(true)

    function handleScan(data) {
        setResult(data);
        if (data !== null) {
            setHideReader(true);
        }
    }

    function handleClickButton() {
        setHideReader(false);
        setResult('')
    }


    function handleError(err) {
        console.error(err)
    }

    return (
        <div>
            <p>{result}</p>
            <Box maxWidth={'500px'} margin={'auto'}>
                {!hideReader ?
                    <QrReader
                        id='qr_reader'
                        delay={0}
                        facingMode={'environment'}
                        onError={handleError}
                        onScan={handleScan}
                        style={{width: '100%'}}
                    /> :
                    <Button
                        variant={"contained"}
                        style={{background: 'green', margin: '0 35%'}}
                        onClick={handleClickButton}
                    >
                        New scan
                    </Button>
                }
            </Box>
        </div>
    )
}

export default Checker;