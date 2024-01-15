import './main.css'
import {useEffect, useState} from "react";
import getItems from "./API/getItems.js";

const STAGES = {
    BPM: 'Select BPM',
    Acoustic: 'Select Acoustic'

}

export default function Main({ accessToken, signOut }) {
    const [stages, setStage] = useState(STAGES.BPM);
    useEffect(() => {
        getItems({ accessToken })
    }, [])

    return (
        <>
            <div className='page_layout'>

            </div>
        </>
    )
}