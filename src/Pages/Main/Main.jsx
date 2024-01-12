import {Button} from "@mantine/core";

export default function Main({ accessToken, signOut }) {
    return (
        <div>
            Main
            <Button onClick={signOut} > Sign out </Button>
        </div>
    )
}