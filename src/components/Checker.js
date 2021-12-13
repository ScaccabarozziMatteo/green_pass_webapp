import React, {useEffect, useState} from 'react'
import QrReader from 'react-qr-reader'
import {Box, Button, Typography} from "@mui/material";
import ResultPage from "./ResultPage";
import * as Realm from "realm-web";

//component need to convert string in bson
const ObjectID = require("bson-objectid");

// realm app config
const REALM_APP_ID = "green_pass_app-ausoi"; // use this for original db
const app = new Realm.App({ id: REALM_APP_ID });


// component to display DB's user data
function UserDetail({ user}) {
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <h3 style={{textAlign:"center"}}>Correctly logged to the DB session id: {user.id}</h3>
        </div>
    );
}

//log in to the mongo db realm instance
const loginAnonymous = async (setUser) => {
    const user = await app.logIn(Realm.Credentials.emailPassword('test@gmail.com', 'test123'));
    //const user = await app.logIn(Realm.Credentials.emailPassword('test@gmail.com', '123456789'));
    console.log(user)
    setUser(user)
};

//add validity green pass check
const validateQueryData = (qrData, dbData)=>{
    //db data contains the ful data
    //TODO add here the validation condition
    return {
        id: qrData.id,
        name: qrData.name,
        bday: qrData.bday,
        surname: qrData.surname,
        address: qrData.address,
        validity : !!dbData
    }
}

//convert a json person in a string creating mandatory field if null
const validateAndParsePersonJson = (person)=>{
    if(!person)
        return ""

    const name = person.name ? person.name : "not defined"
    const surname = person.surname ? person.surname : "not defined"
    const address = person.address ? person.address : "not defined"
    const bday = person.bday ? person.bday : "not defined"
    const id = person.id ? person.id : "not defined"
    const validity = person.validity ? person.validity : "not defined"

    return JSON.stringify({
        name: name,
        bday: bday,
        surname: surname,
        address: address,
        id: id,
        validity: validity,
    })
}


//DELETE IN PRODUCTION the query will return this structure
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
    const [user, setUser] = useState(null);
    const [db, setDb] = useState(null);
    const [resultScan, setResultScan] = useState('')            //result of the QR scan
    const [processedResult, setProcessedResult] = useState('')     //result of green pass check
    const [hideReader, setHideReader] = useState(true)
    const [hideResult, setHideResult] = useState(true)

    //effect of first render
    useEffect( ()=>{
        loginAnonymous(setUser)
            .then(()=>{
                if(app.currentUser) {
                    setDb(app.currentUser.mongoClient("mongodb-atlas").db("covid_19_management").collection("people"));
                }
            }).catch((e)=>alert(e))
    },[])

    //effect of changes in scanned result
    useEffect( ()=>{
        if(resultScan) {
            const jsonResultScan = {...JSON.parse(resultScan)}
            console.log(`query over ${jsonResultScan}`)
            db.findOne({ "_id" : ObjectID(jsonResultScan.id)})
                .then((p)=>{
                    setProcessedResult(validateQueryData(jsonResultScan, p))
                    console.log(`validated data ${validateQueryData(jsonResultScan, p)}`)
                    console.log("proccessed result")
                    console.log(processedResult)
                })
        }
    },[resultScan])


    function handleScan(data) {
        setResultScan(data);
        if (data !== null) {
            setHideReader(true);
            setHideResult(false)
        }
    }

    function handleClickButton() {
        setHideReader(false);
        setHideResult(true);
        setResultScan('')
    }

    function handleError(err) {
        console.error(err)
    }

    return (
        <div>
            <Typography style={{marginTop:"2rem"}} variant="h2" align='center'>Green Pass reader</Typography>
            {user ? <UserDetail user={user} /> : null}
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
                            <ResultPage personData={validateAndParsePersonJson(processedResult)}/>
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
//<RunQuery fetchFunction={fetchPersonById} setPerson={setPerson} searchId={"61b641f56330b6c543bff738"}/>
export default Checker;