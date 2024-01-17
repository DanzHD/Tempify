import axios from "axios";

const MAX_TRACK_ADD = 100;

async function makePlaylist({ accessToken}) {


    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data: {
            "name": "Playlist created by SpotPlot",
            "public": 'false'
        }
    }

    const {data: {id: userID}} = await axios('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    const {data: {id: playlistID} } = await axios(`https://api.spotify.com/v1/users/${userID}/playlists`, options);

    return {playlistID};
}

async function addTracks({ accessToken, playlistID, tracks }) {


    for (let i = 0; i < Math.ceil(tracks.length/MAX_TRACK_ADD); i++) {
        let newTracks = tracks.slice(i * MAX_TRACK_ADD, Math.min(tracks.length, (i + 1) * MAX_TRACK_ADD)).map(track => track.uri);


        let options = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        await axios.post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${newTracks.join(',')}`, {}, options);
    }


}

export default async function createPlaylistWithTracks({ accessToken, tracks}) {
    let {playlistID} = await makePlaylist({accessToken});
    await addTracks({accessToken, playlistID, tracks});
}