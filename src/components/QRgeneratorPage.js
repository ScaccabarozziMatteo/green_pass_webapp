import React, {useState} from "react";
import QRCode from "react-qr-code";
import {Button, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";

const  generateQR = (setPerson,id,name, surname, address, bday) => {
    setPerson(
        {
            id: id,
            name: name,
            bday: bday,
            surname: surname,
            address: address,
        }
    )
}

const validateAndParsePersonJson = (person)=>{
    if(!person)
        return ""

    const id = person.id ? person.id : "not defined"
    const name = person.name ? person.name : "not defined"
    const surname = person.surname ? person.surname : "not defined"
    const address = person.address ? person.address : "not defined"
    const bday = person.bday ? person.bday : "not defined"

    return JSON.stringify({
        id: id,
        name: name,
        bday: bday,
        surname: surname,
        address: address,
    })
}

const QRgeneratorPage = () => {
    const [person, setPerson] = useState(null);
    const [id, setId] = useState("61b641f56330b6c543bff73b");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [bday, setBday] = useState("");

    return(

        <div style={{marginTop:"2rem",display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography variant="h2" align='center'>Green Pass QR generator</Typography>
            {person ?
                <QRCode
                    style={{marginTop:"2rem"}}
                    level="H"
                    value={validateAndParsePersonJson(person)}
                />:null
            }<Typography style={{marginTop:"1rem"}}>test valid id: 61b641f56330b6c543bff73b</Typography>
            <div style={{marginTop:"2rem",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between"}}>
                <TextField
                    style={{marginTop:"1rem", width:"15rem"}}
                    value={id}
                    label="Enter id"
                    onChange={(e) => {
                        setId(e.target.value);
                    }}
                />
                <TextField
                    style={{marginTop:"1rem", width:"15rem"}}
                    value={name}
                    label="Enter name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <TextField
                    style={{marginTop:"1rem", width:"15rem"}}
                    value={surname}
                    label="Enter surname"
                    onChange={(e) => {
                        setSurname(e.target.value);
                    }}
                />
                <TextField
                    style={{marginTop:"1rem", width:"15rem"}}
                    value={address}
                    label="Enter address"
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />
                <TextField
                    style={{marginTop:"1rem", width:"15rem"}}
                    value={bday}
                    label="Enter birthday"
                    onChange={(e) => {
                        setBday(e.target.value);
                    }}
                />
            </div>
            <Button
                variant={"contained"}
                style={{background: 'green', margin: '10% 35%'}}
                onClick={()=>generateQR(setPerson,id, name, surname, address,bday)}
            >
                Generate QR
            </Button>
        </div>
    )
}

export default QRgeneratorPage