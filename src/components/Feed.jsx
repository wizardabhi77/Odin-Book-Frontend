import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';

import Comment from './Comment.jsx';

import styles from '../styles/feed.module.css';
import likeIcon from '../assets/like-button.svg';

export default function Feed() {

    const token = localStorage.getItem("token");

    const decoded =  jwtDecode(token);

    const userId = decoded.id;

    const [feed, setFeed] = useState(null);

    const [likedPosts, setLikedPosts ] = useState([]);
    

    useEffect(() => {

        async function getFeed() {

            const res = await fetch("https://odin-book-backend-mbe2.onrender.com/feed", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },

            })

            const data = await res.json();

           

            setFeed(data);

            const liked = data.filter(post => post.likes.some(like => like.userId === userId))
                                .map(post=> post.id);

            setLikedPosts(liked);

        }

        getFeed();


    }, [token, userId])

    async function handleLike(postId) {

        const liked = !likedPosts.includes(postId);

        const url = liked? "like": "dislike";



        

        const res = await fetch(`https://odin-book-backend-mbe2.onrender.com/${url}`, {
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
            setLikedPosts((prev) => [...prev, postId]);
        }
        else {
            
            setLikedPosts((prev) => prev.filter((id) => id!== postId));
        
        } 
            
    
        setFeed((prev) => 
            prev.map(p => 
               {
                if (p.id === postId) {
                return {
                    ...p,
                    _count: {
                    ...p._count,
                    likes: liked
                        ? p._count.likes + 1
                        : p._count.likes - 1,
                    },
                };
                }
                return p;
                })

        );

        
    }

    

    if(!feed) return <p>NO POSTS YET</p>

    return(
        <div className={styles.feed}>
            <h1>YOUR FEED</h1>
            <ul className={styles.postContainer}>
                {feed.map((post)=> {
                    return (
                        <li key={post.id} className={styles.post}>
                             <p className={styles.author}>Posted By {post.user?.username} <img src={post.user?.profilePic} alt="profilePic" /></p>
                             <h2 className={styles.title}>{post.title}</h2>
                             <p className={styles.content}>{post.content}</p>
                             
                             <p className={styles.date}>Posted at { new Date (post.createdAt).toLocaleDateString()}</p>
                             <button onClick={()=> handleLike(post.id)} className={`${styles.like} ${likedPosts.includes(post.id) ? styles.liked : ""}`}>
                                <img src={likeIcon} />
                                
                             </button>

                             <h2>{post._count.likes}</h2>
                             <Comment postId={post.id}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}