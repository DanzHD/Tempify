import './main.css'
import {useState, useEffect} from "react";
import Header from "../Header/Header.jsx";
import Text from "../../../../../Common/Components/Text/Text.jsx";
import Select from "react-select";
import Button from "../../../../../Common/Components/Button/Button.jsx";
import getItems from "../../getItems.js";

const STAGES = {
    Select: 'Select BPM',
    Tailor: "Tailor playlist",
    Create: 'Playlist created'
}

const TEMPO_OPTIONS = [
    { value: '20-40', label: '20-40'},
    { value: '40-60', label: '40-60'},
    { value: '60-76', label: '60-76'},
    { value: '76-108', label: '76-108'},
    { value: '108-120', label: '108-120'},
    { value: '120-168', label: '120-168'},
    { value: '168-200', label: '168-200'},
    { value: '200+', label: '200+'},
    { value: 'noTempo', label: 'Any'}

];


export default function Main({ accessToken, signOut }) {
    const [stage, setStage] = useState(STAGES.Select);
    const [tracks, setTracks] = useState(null);

    const onGeneratePlaylist = async (e) => {
        e.preventDefault();
        let retrievedTracks = await getItems({accessToken});
        let tempo = e.target.tempo.value;
        if (tempo === 'noTempo' || tempo === null) {
            setTracks(retrievedTracks)
            return;
        }

        if (tempo === '200+') {
            retrievedTracks = retrievedTracks.filter(track => track.tempo >= 200);
        } else {
            let [lowerBound, upperBound] = tempo.split('-');
            retrievedTracks = retrievedTracks.filter(track => (track.tempo >= lowerBound) && (track.tempo <= upperBound));

        }
        setTracks(retrievedTracks);
        setStage(STAGES.Tailor);

    }

    return (
        <>
            <div className='main'>
                <Header signOut={signOut} description={stage} logo={<div className='logo'>SpotPlot</div>} />
                <div className='filter'>
                    {
                        (stage === STAGES.Select) &&
                            <>
                                <Text subheading style={{fontWeight: '600'}}>Select the tempo of your new playlist</Text>
                                <form style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} onSubmit={onGeneratePlaylist}>
                                    <Select name='tempo' className='tempo_select' options={TEMPO_OPTIONS} />
                                    <Button type='submit' style={{marginTop: '20px'}}>Create playlist</Button>
                                </form>
                            </>

                    }
                </div>

            </div>
        </>
    )
}