import {Button} from "@mui/material";

export default function Home({ onConnect }) {
    return (
        <>
            <div>Home</div>
            <Button onClick={onConnect} > Connect to Spotify </Button>
        </>
    )
}