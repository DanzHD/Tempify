import './main.css'
import {useState} from "react";
import Header from "../Header/Header.jsx";
import Text from "../../../../../Common/Components/Text/Text.jsx";
import Select from "react-select";
import Button from "../../../../../Common/Components/Button/Button.jsx";

const STAGES = {
    Select: 'Select BPM',
    Tailor: "Tailor playlist",
    Create: 'Playlist created'
}

const TEMPO_OPTIONS = [
    { value: 'Grave', label: '20-40'},
    { value: 'lento', label: '40-60'},
    { value: 'Adagio', label: '60-76'},
    { value: 'Andante', label: '76-108'},
    { value: 'Moderato', label: '108-120'},
    { value: 'Allegro', label: '120-168'},
    { value: 'Presto', label: '168-200'},
    { value: 'Prestissimo', label: '200+'},
    { value: 'noTempo', label: 'Any'}

];

export default function Main({ accessToken, signOut }) {
    const [stage, setStage] = useState(STAGES.Select);
    const [tempo, setTempo] = useState(null);
    // useEffect(() => {
    //     getItems({ accessToken })
    // }, [])

    const handleTempoNext = (e) => {
        e.preventDefault();
        setStage(STAGES.Acoustic);
        setTempo(e.target.tempo.value)
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
                                <form style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} onSubmit={handleTempoNext}>
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