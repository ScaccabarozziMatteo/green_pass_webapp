import React, {useState} from "react";
import QRCode from "react-qr-code";
import {Button, Typography} from "@mui/material";
import * as Realm from "realm-web";

//component need to convert string in bson
const ObjectID = require("bson-objectid");
//const REALM_APP_ID = "green_pass_app-ausoi"; // use this for original db
const REALM_APP_ID = "application-test-realm-saghy"; // e.g. myapp-abcde

const app = new Realm.App({ id: REALM_APP_ID });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
//const people = mongodb.db("covid_19_management").collection("people");
const people = mongodb.db("new_york_data").collection("new_york_crashes");


// component to display DB user data
function UserDetail({ user }) {
    return (
        <div>
            <h1>Logged in with user id: {user.id}</h1>
        </div>
    );
}

// component for login in the realm app
const  Login = ({setUser}) => {
    const loginAnonymous = async () => {
        //const user = await app.logIn(Realm.Credentials.emailPassword('test@gmail.com', 'test123'));
        const user = await app.logIn(Realm.Credentials.emailPassword('test@gmail.com', '123456789'));
        console.log(user)
        setUser(user)
    };
    return <Button
        variant={"contained"}
        style={{background: 'green', margin: '10% 35%'}}
        onClick={loginAnonymous}
    >
        Log In
    </Button>;
}

// wrapper component that run the query
const  RunQuery = ({fetchFunction,setPerson, searchId}) => {
    return <Button
        variant={"contained"}
        style={{background: 'green', margin: '10% 35%'}}
        onClick={()=>fetchFunction(setPerson,searchId)}
    > Generate QR</Button>;
}

// use this function setting the searchID to get a person with that id
const fetchPersonById = async (setPersonObject, searchId) =>{
    people.findOne({ "_id" : ObjectID(searchId)})
        .then((p)=>{
            setPersonObject(p)
            console.log(p)
        })
}

const QRgeneratorPage = () => {
    const [user, setUser] = useState(app.currentUser);
    const [person, setPerson] = useState(null);

    return(

        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

            <Typography variant="h2" align='center'>Green Pass QR generator</Typography>
            {person ?
                <QRCode
                    level="H"
                    value={JSON.stringify(person)}
                />:null
            }
            <RunQuery fetchFunction={fetchPersonById} setPerson={setPerson} searchId={"617fcaf8db758795fcadb1a7"}/>
            {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
        </div>
    )
}

export default QRgeneratorPage