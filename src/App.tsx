import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './components/PostCard';
import './App.css';

interface ApodPosts {
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string
};

function App() {
    const [ apodPosts, setApodPosts ] = useState< ApodPosts[] >();

    useEffect(() => {
        axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&count=10`)
            .then(( { data } ) => {
                setApodPosts(data)
            })
            .catch(err  => console.log(err))
    }, [])

    return (
        <div className="app">
            <button onClick={() => window.location.reload()}>Click to Refresh</button>
            {apodPosts ? 
                apodPosts.map( post => (
                    <PostCard post={post}/>
                ))
                :
                <>
                    <div className="loader"/>
                    <h1>Loading Images :D</h1>
                </>
            }
        </div>
    );
}

export default App;
