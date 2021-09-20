import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from "../components/PostCard";

interface ApodPosts {
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string
};

function HomePage() {
    const [ apodPosts, setApodPosts ] = useState< ApodPosts[] >();

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("eloysApodAppLikedPhotos") || "[]"))
        axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&count=10`)
            .then(( { data } ) => {
                setApodPosts(data);
            })
            .catch(err  => console.log(err))
    }, [])

    return (
        <div className="app">
            <h1 id="title">Spacestagram</h1>
            <h2 id="subHeading" >Brought to you by NASA’s Astronomy Photo of the Day (APOD) API</h2>
            <button onClick={() => window.location.reload()}>Click To Refresh</button>
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
};

export default HomePage;
