import Flex from "../../Common/Components/Flex/Flex.jsx";
import Button from "../../Common/Components/Button/Button.jsx";
import Text from "../../Common/Components/Text/Text.jsx";

export default function Main({ accessToken, signOut }) {
    return (
        <>
            <Flex align='center' justify='space-around' style={{paddingTop: '1em'}}>
                <Flex align='center'>
                    <Text fw={800} style={{fontSize: '2rem'}} >SpotPlot</Text>
                </Flex>
                <Button onClick={signOut} >Sign out </Button>
            </Flex>


        </>
    )
}