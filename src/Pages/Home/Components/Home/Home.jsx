import {Toaster} from "react-hot-toast";
import './home.css'
import Button from "../../../../Common/Components/Button/Button.jsx";
import Flex from "../../../../Common/Components/Flex/Flex.jsx";
import Text from "../../../../Common/Components/Text/Text.jsx";



export default function Home({ onConnect }) {

    return (
        <>
            <Toaster />

            <Flex style={{paddingTop: '10px', justifyContent: 'center'}}>
                <Text heading style={{fontSize: '3rem', fontWeight: '1100'}}>Tempify</Text>
            </Flex>




            <section className='home_body'>

                <div className='home_text'>
                    <div style={{color: 'white', textAlign: 'center'}}> Create personalized playlists based off a certain tempo automatically</div>


                    <Button style={{marginTop: '20px'}} onClick={onConnect} >

                        <Text style={{fontStyle: 'Circular Std', fontWeight: '700', marginLeft: '10px'}}>
                            Connect to Spotify
                        </Text>
                        <div className='material-symbols-outlined'>arrow_right_alt</div>
                    </Button>

                </div>


            </section>

        </>
    )
}