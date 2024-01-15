import './Styles/App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {generateCodeChallengeFromVerifier, generateCodeVerifier} from "./pkce.jsx";
import notify from "./Common/utils/notify.jsx";
import Home from "./Pages/Home/Components/Home/Home.jsx";
import Main from "./Pages/Main/Main.jsx";


async function getToken({ setToken, authProps }) {

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded'},
        data: {
            ...authProps,
            client_id: import.meta.env.VITE_CLIENT_ID
        },
        url: 'https://accounts.spotify.com/api/token'

    };

    const {data: { access_token: accessToken, refresh_token: refreshToken } } = await axios(options);
    setToken(accessToken);
    localStorage.setItem('refresh-token', refreshToken);

}

function App() {

    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(false);


    const params = new URLSearchParams(window.location.search);
    const spotifyAuthCode = params.get('code');
    const spotifyConnectError = params.get('error');
    const spotifyState = params.get('state');

    useEffect(() => {
        if (!spotifyAuthCode) return;
        const handleConnect = async () => {

            try {
                await getToken({
                    setToken: setAccessToken,
                    authProps: {
                        grant_type: 'authorization_code',
                        code: spotifyAuthCode,
                        redirect_uri: import.meta.env.VITE_REDIRECT_URL,
                        code_verifier: spotifyState

                    }
                })

            } catch(err) {

                setError(true);
            } finally {
                window.history.replaceState(null, "SpotPlot", "/");
            }
        }

        handleConnect();

    }, [spotifyAuthCode]);

    const onConnect = async () => {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);

        const scope = `playlist-read-private playlist-read-collaborative user-follow-read user-read-playback-position`
            + ` user-top-read user-read-recently-played user-library-read `
        const authUrl = new URL("https://accounts.spotify.com/authorize")

        const params = {
            response_type: 'code',
            client_id: import.meta.env.VITE_CLIENT_ID,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: import.meta.env.VITE_REDIRECT_URL,
            state: codeVerifier

        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();

    }

    useEffect(() => {
        if (!spotifyConnectError) return;


        if (spotifyConnectError === 'access_denied') {
            window.history.replaceState(null, "SpotPlot", "/");
            return void notify({
                text: "It looks like you cancelled connecting to Spotify. Please try again"
            });
        }
        setError(true);
    }, [spotifyConnectError]);

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh-token');
        if (!refreshToken || spotifyAuthCode) {
            return;
        }

        const refresh = async () => {
            await getToken({
                setToken: setAccessToken,
                authProps: {
                    refresh_token: refreshToken,
                    grant_type: "refresh_token"
                }
            });

        }
        refresh();
        // Refresh the token every 30 minutes
        setInterval(refresh, 1800000);
    }, [spotifyAuthCode]);

    const signOut = () => {
        localStorage.removeItem('refresh-token');
        setAccessToken(null);
    }

    if (error) {
        notify({text: "Something went wrong"})
    }

    if ((spotifyAuthCode || localStorage.getItem('refresh-token')) && !accessToken) {
        return null;
    }

    if (!accessToken) {
        return <Home onConnect={onConnect} />
    }

    return <Main accessToken={accessToken} signOut={signOut} />

}

export default App
