import {Typography} from "@mui/material";

export default function Home() {
    return(
        <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
            <Typography style={{marginTop:"1rem"}} variant={"h2"}>Welcome on our webapp!</Typography>
            <Typography style={{marginTop:"1rem"}} variant={"h6"}>You can check a Green Pass validity or you can generate a Green Pass QR code.</Typography>
            <Typography variant={"h6"}>Enjoy :)</Typography>
            <Typography style={{marginTop:"1rem"}} variant={"h6"}>The id contained in the QR code is checked on our MongoDb</Typography>
            <Typography style={{marginTop:"1rem"}} variant={"h6"}>The personal data encoded in the QR code is shown togheter with the validity </Typography>
        </div>
    )
}