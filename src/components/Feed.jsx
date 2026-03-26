import { useEffect, useState } from 'react'
import Comment from './Comment.jsx';

export default function Feed() {

    const token = localStorage.getItem("token");

    const [feed, setFeed] = useState(null);

    const [likedPosts, setLikedPosts ] = useState([]);
    

    useEffect(() => {

        async function getFeed() {

            const res = await fetch("http://localhost:5050/feed", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },

            })

            const data = await res.json();

            console.log(data);

            setFeed(data);

        }

        getFeed();


    }, [token])

    async function handleLike(postId) {

        const liked = !likedPosts.includes(postId);

        const url = liked? "like": "dislike";



        

        const res = await fetch(`http://localhost:5050/${url}`, {
            method: "POST",
            headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
            body: JSON.stringify({
                postId: postId
            })
        });

        const updatedPost = await res.json();

        if(liked) {
            setLikedPosts((prev) => [...prev, updatedPost.id]);
        }
        else {
            
            setLikedPosts((prev) => prev.filter((id) => id!== postId));
        
        } 
            
    
        setFeed((post) => {
            return post.map((post)=> post.id == updatedPost.id? updatedPost : post)
        });

        
    }

    

    if(!feed) return <p>NO POSTS YET</p>

    return(
        <div>
            <h3>YOUR FEED</h3>
            <ul>
                {feed.map((post)=> {
                    return (
                        <li key={post.id}>
                             <h2>{post.title}</h2>
                             <p>{post.content}</p>
                             <p>Posted By {post.user?.username}</p>
                             <p>Posted at { new Date (post.createdAt).toLocaleDateString()}</p>
                             <button onClick={()=> handleLike(post.id)}>{likedPosts.includes(post.id)? "DISLIKE!!":"LIKE!!"}<h2>{post.likes}</h2></button>
                             <Comment postId={post.id}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}