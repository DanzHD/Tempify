import axios from "axios";

const MAX_LIMIT = 50;

async function getAllTracks({ accessToken, playlistID }) {
    const options = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }
    const {data: {total}} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=1`, options);

    if (total <= MAX_LIMIT) {
        const {data: {items}} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=${MAX_LIMIT}`, options);
        return items.map(item => item.track.id);

    }
    let requests = [];
    for (let i = 0; i < Math.ceil(total/MAX_LIMIT); i++) {
        let {data: {items}} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=${MAX_LIMIT}&offset=${i * MAX_LIMIT}`, options);
        requests.push(items);
    }

    const allTracks = await Promise.all(requests);
    return allTracks.reduce((all, items) => [...all, ...items.map(item => item.track.id)], []);



}

async function getAllPlaylists({ accessToken }) {
    const limit = 50;

    const options = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }
    const {data: {total}} = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=1`, options);

    if (total <= MAX_LIMIT) {
        const {data: {items}} = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, options);

        return items.map(playlist => playlist.id);
    }

    const requests = []

    for (let i = 0; i < Math.ceil(total/MAX_LIMIT); i++) {
        let {data: {items} } = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${MAX_LIMIT * i}`, options)
        requests.push(items);
    }

    const allPlaylists = await Promise.all(requests);
    return allPlaylists.reduce((all, playlists) => [...all, ...(playlists.map(playlist => playlist.id))], []);

}

export default async function getItems({accessToken}) {
    let tracks = []
    let playlists = await getAllPlaylists({ accessToken});
    for (let i = 0; i < playlists.length; i++) {

        let newTracks = await getAllTracks({ accessToken, playlistID: playlists[i]});
        tracks = [...tracks, ...newTracks];
    }




}
