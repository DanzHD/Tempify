import axios from "axios";

const MAX_ITEM_LIMIT = 50;
const MAX_ANALYSIS_LIMIT = 100;

async function getAllTracks({ accessToken, playlistID }) {
    const options = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }
    const {data: {total}} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=1`, options);

    if (total <= MAX_ITEM_LIMIT) {
        const {data: {items}} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=${MAX_ITEM_LIMIT}`, options);
        return items.map(item => {
            return {
                id: item.track.id,
                name: item.track.name,
                image: item.track.album.images[0].url,
                uri: item.track.uri,
                artists: item.track.artists
            }
        });
    }

    let requests = [];
    for (let i = 0; i < Math.ceil(total/MAX_ITEM_LIMIT); i++) {
        let {data: {items}} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=${MAX_ITEM_LIMIT}&offset=${i * MAX_ITEM_LIMIT}`, options);
        requests.push(items);
    }

    const allTracks = await Promise.all(requests);
    return allTracks.reduce((all, items) => [...all, ...items.map(item => {
        return {
            id: item.track.id,
            name: item.track.name,
            image: item.track.album.images[0].url,
            uri: item.track.uri,
            artists: item.track.artists
        }
    })], []);

}

async function getLikedTracks({ accessToken }) {
    const options = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }
    const {data: {total}} = await axios.get(`https://api.spotify.com/v1/me/tracks?limit=1`, options);

    if (total <= MAX_ITEM_LIMIT) {
        const {data: {items}} = await axios.get(`https://api.spotify.com/v1/me/tracks?limit=50`, options);
        return items.map(item => {
            return {
                id: item.track.id,
                name: item.track.name,
                image: item.track.album.images[0].url,
                uri: item.track.uri,
                artists: item.track.artists

            }
        });
    }

    let requests = [];
    for (let i = 0; i < Math.ceil(total/MAX_ITEM_LIMIT); i++) {
        let {data: {items}} = await axios.get(`https://api.spotify.com/v1/me/tracks?limit=${MAX_ITEM_LIMIT}&offset=${MAX_ITEM_LIMIT * i}`, options);
        requests.push(items);
    }

    const allTracks = await Promise.all(requests);
    return allTracks.reduce((all, items) => [...all, ...items.map(item => {
        return {
            id: item.track.id,
            name: item.track.name,
            image: item.track.album.images[0].url,
            uri: item.track.uri,
            artists: item.track.artists
        }
    })], []);

}

async function getAllTrackAnalysis({ accessToken, tracks }) {
    const options = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }

    const requests = []
    for (let i = 0; i < tracks.length; i += MAX_ANALYSIS_LIMIT) {
        let analyseTracks = tracks.slice(i, Math.min(i + MAX_ANALYSIS_LIMIT, tracks.length)).map(track => {

            return track.id
        }).toString();



        let {data: {audio_features: audioFeatures}} = await axios(`https://api.spotify.com/v1/audio-features?ids=${analyseTracks}`, options);

        requests.push(audioFeatures.map(audioFeature => {

            let track = tracks.find(track => audioFeature.id === track.id);
            return {...audioFeature, ...track}

        }));
    }

    const trackAudioFeatures = await Promise.all(requests);
    return trackAudioFeatures.reduce((all, audioFeatures) => [...all, ...audioFeatures], []);

}

async function getAllPlaylists({ accessToken }) {
    const limit = 50;

    const options = {
        headers: { Authorization: `Bearer ${accessToken}`}
    }
    const {data: {total}} = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=1`, options);

    if (total <= MAX_ITEM_LIMIT) {
        const {data: {items}} = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, options);

        return items.map(playlist => playlist.id);
    }

    const requests = []

    for (let i = 0; i < Math.ceil(total/MAX_ITEM_LIMIT); i++) {
        let {data: {items} } = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${MAX_ITEM_LIMIT * i}`, options)
        requests.push(items);
    }

    const allPlaylists = await Promise.all(requests);
    return allPlaylists.reduce((all, playlists) => [...all, ...(playlists.map(playlist => playlist.id))], []);

}

export default async function getItems({accessToken}) {
    let tracks = [];

    let playlists = await getAllPlaylists({ accessToken});
    for (let i = 0; i < playlists.length; i++) {

        let newTracks = await getAllTracks({ accessToken, playlistID: playlists[i]});
        tracks = [...tracks, ...newTracks];
    }

    const likedTracks = await getLikedTracks({accessToken});

    tracks = [...tracks, ...likedTracks];

    let tracksAudioFeatures = await getAllTrackAnalysis({ accessToken, tracks})


    return tracksAudioFeatures;





}
