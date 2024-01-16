import './main.css'
import {useState} from "react";
import Header from "../Header/Header.jsx";

const STAGES = {
    BPM: 'Select BPM',
    Acoustic: 'Select Acoustic'

}

export default function Main({ accessToken, signOut }) {
    const [stages, setStage] = useState(STAGES.BPM);
    // useEffect(() => {
    //     getItems({ accessToken })
    // }, [])

    return (
        <>
            <div className='main'>
                <Header signOut={signOut} logo={<div className='logo'>SpotPlot</div>} />
            </div>
        </>
    )
}