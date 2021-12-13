import React from 'react'
import QrReader from 'react-qr-reader'
import {Box, Button, Typography} from "@mui/material";
import ResultPage from "./ResultPage";

// the query will return this structure
const testPerson = {
    "name": "Helsa",
    "surname": "Thunell",
    "address": "62951 Moulton Place",
    "zip_code": "TR",
    "city": "Dibrugarh",
    "email": "Helsa.Thunell@gmail.com",
    "telephone_number": 3719447379,
    "vaccines": [
        {
            "brand": "moderna",
            "lot": 300142,
            "type": 2,
            "production_date": {
                "$date": "2020-11-02T20:58:00.000+00:00"
            },
            "injection_date": {
                "$date": "2021-04-12T11:13:00.000+00:00"
            },
            "vaccine_hub": {
                "name": "Magdalen",
                "authorization_number": 1162,
                "zip_code": "SK",
                "city": "Mata-Utu",
                "location": {
                    "latitude": -77.194,
                    "longitude": 49.201
                },
                "hub_type": "hospital",
                "address": "2079 Ludington Plaza"
            },
            "healthcare_personnel": [
                {
                    "name": "Brandise",
                    "surname": "Sacken",
                    "role": "doctor",
                    "work_id": 8749619910
                },
                {
                    "name": "Emma",
                    "surname": "Shaddock",
                    "role": "nurse",
                    "work_id": 1763350619
                }
            ]
        }
    ],
    "tests": [
        {
            "test_date": {
                "$date": "2021-03-25T15:41:00.000+00:00"
            },
            "test_hub": {
                "name": "Maxi",
                "authorization_number": 1088,
                "zip_code": "SR",
                "city": "Blantyre",
                "location": {
                    "latitude": 7.618,
                    "longitude": -161.117
                },
                "hub_type": "military",
                "address": "75153 Saint Paul Place"
            },
            "result": "negative"
        }
    ],
    "emergency_contact": {
        "name": "Damaris",
        "surname": "Tamsky",
        "zip_code": "LC",
        "city": "The Hague",
        "email": "Damaris.Tamsky@gmail.com",
        "telephone_number": 3375858737
    }
}

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