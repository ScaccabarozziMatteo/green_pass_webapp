import React, {useState} from "react";
import QRCode from "react-qr-code";


// Import the MongoDB Realm Web SDK
import * as Realm from "realm-web";
//component need to convert string in bson
const ObjectID = require("bson-objectid");
//const REALM_APP_ID = "green_pass_app-ausoi"; // use this for original db
const REALM_APP_ID = "application-test-realm-saghy"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
//const people = mongodb.db("covid_19_management").collection("people");
const people = mongodb.db("new_york_data").collection("new_york_crashes");

/* DEKETE IN FINAL VERSION
const PersonSchema = {
    name: "Person",
    properties: { //person
        _id: "objectId",
        name: "string",
        surname: "string",
        bday: "date",
        address: "string",
        zip_code: "string",
        city: "string",
        email: "string",
        telephone_number: "int",
        vaccines: "data",
        tests: "data",
        emergency_contact: "data?"
    }
    ,
    primaryKey: "_id",
};
*/

// Create a component that displays the given user's details
function UserDetail({ user }) {
    return (
        <div>
            <h1>Logged in with id: {user.id}</h1>
        </div>
    );
}

// Create a component that lets an anonymous user log in
const  Login = ({setUser}) => {
    const loginAnonymous = async () => {
        //const user = await app.logIn(Realm.Credentials.emailPassword('test@gmail.com', 'test123'));
        const user = await app.logIn(Realm.Credentials.emailPassword('test@gmail.com', '123456789'));
        console.log(user)
        setUser(user)
    };
    return <button onClick={loginAnonymous}>Log In</button>;
}
const  RunQuery = ({fetchFunction,setPerson, searchId}) => {
    return <button onClick={()=>fetchFunction(setPerson,searchId)}>Run Query</button>;
}

const fetchPersonById = async (setPersonObject, searchId) =>{

    //setPersonObject(person)
    //console.log(person)
    //const numPlants = await people.count();
    people.findOne({ "_id" : ObjectID(searchId)}).then((p)=>console.log(p)) //need to convert in BSON
    //console.log(`There are ${numPlants} plants in the collection`);
}

export default function QRgeneratorPage() {
    const [user, setUser] = useState(app.currentUser);
    const [person, setPerson] = useState(null);

    return(

        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <h2 align='center'>Green Pass QR generator</h2>

            <Login />

            <QRCode
                value={JSON.stringify({
                    name: 'Matteo',
                    surname: 'Scaccabarozzi',
                    birthdate: '02-04-1996',
                    validity: true
                })}
            />
            <RunQuery fetchFunction={fetchPersonById} setPerson={setPerson} searchId={"617fcaf8db758795fcadb1a7"}/>
            {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
        </div>
    )
}