import React from 'react'
import QrReader from 'react-qr-reader'
import {Box, Button, Typography} from "@mui/material";
import ResultPage from "./ResultPage";

function Checker() {

    const [result, setResult] = React.useState('')
    const [hideReader, setHideReader] = React.useState(true)
    const [hideResult, setHideResult] = React.useState(true)


    function handleScan(data) {
        setResult(data);
        if (data !== null) {
            setHideReader(true);
            setHideResult(false)
        }
    }

    function handleClickButton() {
        setHideReader(false);
        setHideResult(true);
        setResult('')
    }


    function handleError(err) {
        console.error(err)
    }

    return (
        <div>
            <Typography variant="h2" align='center'>Green Pass reader</Typography>
            <Box maxWidth={'500px'} margin={'auto'} padding={'5%'}>
                {!hideReader ?
                    <QrReader
                        id='qr_reader'
                        delay={0}
                        facingMode={'environment'}
                        onError={handleError}
                        onScan={handleScan}
                        style={{width: '100%'}}
                    /> :
                    <React.Fragment>
                        {!hideResult ?
                            <ResultPage data={result}/>
                            : ''
                        }
                        <Button
                            variant={"contained"}
                            style={{background: 'green', margin: '10% 35%'}}
                            onClick={handleClickButton}
                        >
                            New scan
                        </Button>
                    </React.Fragment>
                }
            </Box>
        </div>
    )
}

export default Checker;