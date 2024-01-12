import {Toaster} from "react-hot-toast";
import {Button, Flex, Grid, Image, Text, Title} from "@mantine/core";
import '@mantine/core/styles.css';
import './home.css'

export default function Home({ onConnect }) {
    return (
        <>
            <Toaster />
            <Flex align='center' justify='space-around' style={{paddingTop: '1em'}}>
                <Flex align='center'>
                    <Text  fw={800} style={{fontSize: '2rem'}} >SpotPlot</Text>
                </Flex>


                <Button onClick={onConnect} variant="filled" size='lg'>
                    <Image src='../.././assets/Spotify_Icon_RGB_Black.png' height='25px' width='25px' style={{marginRight: '0.5em'}}/>
                    <Text style={{fontStyle: 'Circular Std', fontWeight: '700', fontSize: '1em'}}>Connect to Spotify</Text>
                </Button>
            </Flex>

            <section className='home_body'>
                <div className='home_charts'>
                    Placeholder
                </div>
                <div className='home_text'>
                    <div style={{fontSize: '2rem', color: 'white', lineHeight: '2'}}> Visualize your own personalized Spotify data</div>
                    <div style={{fontSize: '1.5rem', fontWeight: '500'}}>Simply connect your Spotify account and we'll generate beautiful plots of your data</div>
                    <Button style={{marginTop: '5rem'}} onClick={onConnect} variant="filled" size='lg'>
                        <Image src='../.././assets/Spotify_Icon_RGB_Black.png' height='25px' width='25px' style={{marginRight: '0.5em'}}/>
                        <Text style={{fontStyle: 'Circular Std', fontWeight: '700', fontSize: '1em'}}>
                            Connect to Spotify
                        </Text>
                    </Button>
                </div>
            </section>


        </>
    )
}