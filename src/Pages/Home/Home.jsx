import {Toaster} from "react-hot-toast";
import './home.css'
import Button from "../../Common/Components/Button/Button.jsx";
import Flex from "../../Common/Components/Flex/Flex.jsx";
import Text from "../../Common/Components/Text/Text.jsx";



export default function Home({ onConnect }) {

    return (
        <>
            <Toaster />

            <Flex style={{paddingTop: '10px'}}>
                <Text heading style={{fontSize: '3rem', fontWeight: '1100', textAlign: 'center'}} >SpotPlot</Text>
            </Flex>




            <section className='home_body'>
                <div className='home_charts'>
                    Placeholder
                </div>
                <div className='home_text'>
                    <div style={{color: 'white'}}> Visualize your own personalized Spotify data</div>
                    <div style={{fontSize: '1em', fontWeight: '500'}}>Simply connect your Spotify account and we'll generate beautiful plots of your data</div>

                    <Button style={{marginTop: '5rem'}} onClick={onConnect} >
                        <img
                            alt='logo'
                            src='../.././assets/Spotify_Icon_RGB_Black.png'
                            style={{height: '25px', width: '25px', marginRight: '0.5em'}}/>
                        <Text subheading style={{fontStyle: 'Circular Std', fontWeight: '700'}}>
                            Connect to Spotify
                        </Text>
                    </Button>
                </div>
            </section>


        </>
    )
}