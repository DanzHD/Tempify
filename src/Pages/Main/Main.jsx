import Flex from "../../Common/Components/Flex/Flex.jsx";
import Button from "../../Common/Components/Button/Button.jsx";
import Text from "../../Common/Components/Text/Text.jsx";
import './main.css'
import Carousel from "../../Common/Components/Carousel/Carousel.jsx";

export default function Main({ accessToken, signOut }) {
    return (
        <>
            <div className='page_layout_main'>

                <div className='main_heading'>

                    <Flex style={{justifyContent: "space-around"}}>

                        <Text style={{fontSize: '3rem', fontWeight: '900'}}>SpotPlot</Text>

                        <Button onClick={signOut} style={{fontSize: '1em'}}>
                            <span className="material-symbols-outlined">logout</span>
                            <Text subheading style={{marginLeft: '10px'}}>Sign out </Text>
                        </Button>
                    </Flex>
                </div>

                <Carousel>
                    <div>
                        1
                    </div>
                    <div>
                        2
                    </div>
                    <div>3</div>

                </Carousel>
            </div>




        </>
    )
}