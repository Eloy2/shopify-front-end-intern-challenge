import { useState } from "react";
import { Route } from "react-router-dom";
import { ApodPosts } from "./types"
import HomePage from "./Pages/HomePage";
import LikedPhotosPage from "./Pages/LikedPhotosPage";

function App() {
    const [ likedPhotos, setLikedPhotos ] = useState< ApodPosts[] >([]);

    return (
        <>
            <Route 
                exact path="/"
                render={(props) => (
                    <HomePage {...props} likedPhotos={likedPhotos} setLikedPhotos={setLikedPhotos}/>
                )}
            />
            <Route 
                exact path="/LikedPhotosPage"
                render={(props) => (
                    <LikedPhotosPage {...props} likedPhotos={likedPhotos} setLikedPhotos={setLikedPhotos}/>
                )}
            />
        </>
    );
}

export default App;
