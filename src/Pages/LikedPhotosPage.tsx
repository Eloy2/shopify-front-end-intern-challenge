import { useEffect, FC } from 'react';
import { ApodPosts } from '../types';
import PostCard from '../components/PostCard';
import "../App.css";

interface Props {
    likedPhotos: ApodPosts[],
    setLikedPhotos: React.Dispatch<React.SetStateAction<ApodPosts[]>>
}

const LikedPhotosPage: FC<Props> = ( { likedPhotos, setLikedPhotos } ) => {

    useEffect(() => {
        if (localStorage.getItem("eloysApodAppLikedPhotos")) {
            setLikedPhotos(JSON.parse(localStorage.getItem("eloysApodAppLikedPhotos") || "[]"))
        }
    }, [])

    return (
        <div className="app">
            <h1 id="title">Liked Photos</h1>
            <h2 id="subHeading">Here you can view all your liked photos</h2>
            <button onClick={() => window.location.href = "/"}>Back To Home</button>
            {likedPhotos.length > 0 ? 
                likedPhotos.map( photo => (
                    <PostCard 
                        key={photo.date} 
                        post={photo} 
                        likedPhotos={likedPhotos} 
                        setLikedPhotos={setLikedPhotos}
                    />
                ))
                :
                <h1>You Currently Have No liked Photos D:</h1>
            }
        </div>
    );
};

export default LikedPhotosPage;