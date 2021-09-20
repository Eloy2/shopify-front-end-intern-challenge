import { FC } from 'react'
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
    console.log(post)
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
        </div>
    )
}

export default PostCard;
