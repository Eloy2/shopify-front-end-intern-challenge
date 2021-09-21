import { useState, useEffect, FC } from 'react';
import { ApodPosts } from '../types';
import axios from 'axios';
import PostCard from "../components/PostCard";

interface Props {
    likedPhotos: ApodPosts[]
    setLikedPhotos: React.Dispatch<React.SetStateAction<ApodPosts[]>>
}

const HomePage: FC<Props> = ( { likedPhotos, setLikedPhotos } ) => {
    const [ apodPosts, setApodPosts ] = useState< ApodPosts[] >();

    useEffect(() => {
        axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&count=10`)
            .then(( { data } ) => {
                setApodPosts(data);
            })
            .catch(err  => console.log(err))
    }, [])

    return (
        <div className="app">
            <h1 id="title">SpaceStagram</h1>
            <h2 id="subHeading" >Brought to you by NASA’s Astronomy Photo of the Day (APOD) API</h2>
            <h2 id="subHeading" >Displays random list of APOD images</h2>
            <div className="buttonsDiv">
                <button onClick={() => window.location.reload()}>Click To Refresh</button>
                <button onClick={() => window.location.href = "/LikedPhotosPage"}>Liked Photos</button>
            </div>
            {apodPosts ? 
                apodPosts.map( post => (
                    <PostCard key={post.date} post={post} setLikedPhotos={setLikedPhotos} likedPhotos={likedPhotos}/>
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
