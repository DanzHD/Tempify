import {Button} from "@mui/material";

export default function Main({ accessToken, signOut }) {
    return (
        <div>
            Main
            <Button onClick={signOut} > Sign out </Button>
        </div>
    )
}