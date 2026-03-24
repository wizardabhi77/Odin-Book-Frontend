import { useEffect, useState } from 'react'

export default function Feed() {

    const token = localStorage.getItem("token");

    const [feed, setFeed] = useState(null);

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
                             <p>Posted By {post.user.username}</p>
                             <p>Posted at { new Date (post.createdAt).toLocaleDateString()}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}