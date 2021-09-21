import { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faClipboard } from '@fortawesome/free-solid-svg-icons'
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
    post: ApodPosts,
    likedPhotos: ApodPosts[] | undefined,
    setLikedPhotos: React.Dispatch<React.SetStateAction<ApodPosts[] | undefined>>,
    refreshLikedPhotosPage?: () => void
}

const PostCard: FC<Props> = ( { post, likedPhotos, setLikedPhotos } ) => {
    const  [liked, setLiked ] = useState(false)

    useEffect(() => {
        const likedPhotos = JSON.parse(localStorage.getItem("eloysApodAppLikedPhotos") || "[]")
        likedPhotos.forEach((photo: ApodPosts) => {
            if (photo.date === post.date) {
                setLiked(true)
            }
        })
    }, [post.date])

    function updateLikedPhotos() {
        if (localStorage.getItem("eloysApodAppLikedPhotos")) {
            if (liked) { // remove
                // remove from local storage
                const localStoragelikedPhotos = JSON.parse(localStorage.getItem("eloysApodAppLikedPhotos") || "[]")
                const updatedPhotos = localStoragelikedPhotos.filter((p: ApodPosts) => p.date !== post.date)
                localStorage.setItem("eloysApodAppLikedPhotos", JSON.stringify(updatedPhotos))
                setLiked(false)
                // remove from likedPhotos
                const copyOfLikedPhotos = likedPhotos
                const updatedLikedPhotos = copyOfLikedPhotos?.filter((p: ApodPosts) => p.date !== post.date)
                setLikedPhotos(updatedLikedPhotos)
            } else { // add
                const localStoragelikedPhotos = JSON.parse(localStorage.getItem("eloysApodAppLikedPhotos") || "[]")
                localStoragelikedPhotos.push(post)
                localStorage.setItem("eloysApodAppLikedPhotos", JSON.stringify(localStoragelikedPhotos))
                setLiked(true)
            }
        } else {
            localStorage.setItem("eloysApodAppLikedPhotos", JSON.stringify([post]))
            setLiked(true)
        }
    }

    return (
        
        <div className="postCard">
            <div>
                { post.media_type === "image" ? 
                    <img id="postImage" alt={post.title} src={post.url}/>
                :
                    <h1>
                        Sorry, no image available. 
                        I will add support for other media types in the future :D
                    </h1>
                }
            </div>
            <h1>{post.title} - {post.date}</h1>
            <p>{post.explanation}</p>
            <div className="iconDiv">
                <FontAwesomeIcon 
                    icon={faHeart}
                    title={liked ? "Remove From Liked Photos" : "Add To Liked Photos"}
                    className={liked ? "likedPostButton" : "likeButton"}
                    onClick={() => updateLikedPhotos()}
                    />
                <FontAwesomeIcon 
                    icon={faClipboard}
                    title="Copy link to clipboard. For Sharing :D"
                    className={"clipboard"}
                    onClick={() => navigator.clipboard.writeText(post.url)}
                    />
            </div>
        </div>
    )
}

export default PostCard;
