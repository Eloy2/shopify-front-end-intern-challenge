import { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import '../App.css';

interface ApodPosts {
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string
};

interface Props {
    post: ApodPosts
}

const PostCard: FC<Props> = ( { post } ) => {
    const  [liked, setLiked ] = useState(false)

    function addToLikedPhotos() {
        if (localStorage.getItem("eloysApodAppLikedPhotos")) {
            console.log(JSON.parse(localStorage.getItem("eloysApodAppLikedPhotos") || "[]"))
        } else {
            localStorage.setItem("eloysApodAppLikedPhotos", JSON.stringify([post]))
        }
    }

    return (
        
        <div className="postCard">
            <div>
                { post.media_type === "image" ? 
                    <img id="postImage" alt={post.title} src={post.url}/>
                :
                    <h1>
                        Sorry no image available. 
                        I will add support for other media types in the future :D
                    </h1>
                }
            </div>
            <h1>{post.title} - {post.date}</h1>
            <p>{post.explanation}</p>
            <FontAwesomeIcon 
                icon={faHeart} 
                title="Add To Liked Photos" 
                className="likeButton"
                onClick={() => addToLikedPhotos()}
                />
        </div>
    )
}

export default PostCard;
