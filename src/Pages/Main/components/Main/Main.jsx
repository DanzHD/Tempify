import './main.css'
import {useState, useEffect} from "react";
import Header from "../Header/Header.jsx";
import Text from "../../../../Common/Components/Text/Text.jsx";
import Select from "react-select";
import Button from "../../../../Common/Components/Button/Button.jsx";
import getItems from "../../API/getItems.jsx";
import Pagination from "../pagination/Pagination.jsx";
import createPlaylistWithTracks from "../../API/createPlaylist.jsx";

const STAGES = {
    Select: 'Select BPM',
    Tailor: "Tailor playlist",
    Create: 'Jam'
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

const TRACKS_PER_PAGE = 20;


export default function Main({ accessToken, signOut }) {
    const [stage, setStage] = useState(STAGES.Select);
    const [tracks, setTracks] = useState([]);
    const [creatingPlaylist, setCreatingPlaylist] = useState(false);
    const [addingPlaylist, setAddingPlaylist] = useState(false);

    const onGeneratePlaylist = async (e) => {
        e.preventDefault();
        setCreatingPlaylist(true);
        let retrievedTracks = await getItems({accessToken});
        retrievedTracks.map(track => {
            track.enabled = true;
            return track;
        });


        /* remove duplicates */
        retrievedTracks = retrievedTracks.filter((track, i) => {
            return i === retrievedTracks.findIndex(t => track.id === t.id)
        })

        let tempo = e.target.tempo.value;

        if (tempo === 'noTempo' || tempo === null || tempo === undefined) {
            setTracks(retrievedTracks)
            setStage(STAGES.Tailor);
            setCreatingPlaylist(false);
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
        setCreatingPlaylist(false);

    }

    const handleCreatePlaylist = async () => {
        setAddingPlaylist(true);
        const filteredTracks = tracks.filter(track => track.enabled);

        await createPlaylistWithTracks({accessToken, tracks: filteredTracks});
        setStage(STAGES.Create);
        setAddingPlaylist(false);
    }



    if (creatingPlaylist) {
        return (
            <>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text heading>Generating Playlist</Text>
                    <div className='loader'></div>

                </div>

            </>
        )
    }

    if (addingPlaylist) {
        return (
            <>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text heading>Adding Playlist to library</Text>
                    <div className='loader'></div>

                </div>

            </>
        )
    }


    return (
        <>
            <div className='main'>
                <Header signOut={signOut} description={stage} logo={<div className='logo'>Tempify</div>} />
                {
                    (stage === STAGES.Select) &&
                        <div className='filter'>

                            <Text subheading style={{fontWeight: '600'}}>Select the tempo of your new playlist</Text>
                            <form style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} onSubmit={onGeneratePlaylist}>
                                <Select name='tempo' className='tempo_select' options={TEMPO_OPTIONS} />
                                <Button type='submit' style={{marginTop: '20px'}}>Create playlist</Button>
                            </form>


                        </div>
                }
                {
                    (stage === STAGES.Tailor) &&

                        <div className='tailor'>
                            <Pagination items={tracks} itemsPerPage={TRACKS_PER_PAGE} />
                            <div className='main_tailor_footer'>

                                <Button onClick={() => setStage(STAGES.Select)}> Back </Button>
                                {tracks.length !== 0 && <Button onClick={handleCreatePlaylist} > Create </Button> }
                            </div>

                        </div>
                }
                {
                    (stage === STAGES.Create) &&
                    <div className='create'>
                        <Text subheading>Playlist Created!</Text>
                        <Button onClick={() => setStage(STAGES.Select)}>Create another playlist</Button>
                    </div>
                }

                <svg style={{display: 'flex', marginTop: "auto", overflow: "visible"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#90EE90" fillOpacity="1" d="M0,256L34.3,234.7C68.6,213,137,171,206,165.3C274.3,160,343,192,411,218.7C480,245,549,267,617,234.7C685.7,203,754,117,823,101.3C891.4,85,960,139,1029,176C1097.1,213,1166,235,1234,218.7C1302.9,203,1371,149,1406,122.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                </svg>

            </div>
        </>
    )
}