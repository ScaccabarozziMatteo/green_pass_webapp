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
    //console.log(user)
    setUser(user)
};

//add validity green pass check
const validateQueryData = (qrData, dbData)=>{
    //db data contains the ful data
    //TODO add here the validation condition
    console.log({
        id: qrData.id,
        name: qrData.name,
        bday: qrData.bday,
        surname: qrData.surname,
        address: qrData.address,
        validity : !!dbData
    })
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
    const validity = person.validity ? person.validity : false

    return JSON.stringify({
        name: name,
        bday: bday,
        surname: surname,
        address: address,
        id: id,
        validity: validity,
    })
}


function Checker() {
    const [user, setUser] = useState(null);
    const [db, setDb] = useState(null);
    const [resultScan, setResultScan] = useState('')            //result of the QR scan
    const [processedResult, setProcessedResult] = useState('')     //result of green pass check JSON
    const [processedResultStr, setProcessedResultStr] = useState('')     //result of green pass check text for result component
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

            //id lenght should be 24 characters to be corrected
            if(jsonResultScan.id && (jsonResultScan.id.toString().length === 24))
                db.findOne({ "_id" : ObjectID(jsonResultScan.id)})
                    .then((p)=>{
                        setProcessedResult(validateQueryData(jsonResultScan, p))
                    })

            else setProcessedResult(validateQueryData(jsonResultScan, false))
        }
    },[resultScan])

    //effect of changes in processResult json converted to string and validated
    useEffect( ()=>{
        setProcessedResultStr(validateAndParsePersonJson(processedResult))
    },[processedResult])


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
        setProcessedResultStr('')
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
                        {!hideResult && processedResultStr ?
                            <ResultPage personData={processedResultStr}/>
                            : ''
                        }
                        {user ?
                            <Button
                                variant={"contained"}
                                style={{background: 'green', margin: '10% 35%'}}
                                onClick={handleClickButton}
                            >
                                New scan
                            </Button>
                            : null}
                    </React.Fragment>
                }
            </Box>
        </div>
    )
}

export default Checker;