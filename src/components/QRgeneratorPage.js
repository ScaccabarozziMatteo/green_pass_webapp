import React from "react";

// Import the MongoDB Realm Web SDK
import * as Realm from "realm-web";

// Connect to your MongoDB Realm app
const REALM_APP_ID = "application-0-uiwse"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });

// Create a component that displays the given user's details
function UserDetail({ user }) {
    return (
        <div>
            <h1>Logged in with anonymous id: {user.id}</h1>
        </div>
    );
}

// Create a component that lets an anonymous user log in
function Login() {
    const loginAnonymous = async () => {
        const user = await app.logIn(Realm.Credentials.emailPassword('barozzi966@gmail.com', 'ciaociao'));
        console.log(user)
    };
    return <button onClick={loginAnonymous}>Log In</button>;
}

export default function QRgeneratorPage() {

    return(
        <div>
            <Login />
            QR Generator Page
        </div>
    )
}