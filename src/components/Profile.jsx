import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

export default function Profile() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {

        async function getPosts() {

            const res = await fetch("http://localhost:5050/post/user",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            });

            const data = await res.json();

            setPosts(data);
        }

        getPosts();
    })

    async function handleDelete(postId) {

        const res = await fetch("http://localhost:5050/post/delete",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                postId: postId
            })
        });

        const data = await res.json();

        const newPosts = posts.filter((post) => post.id !== data.id);

        setPosts((prev)=> [...prev, newPosts]);
    }

    return (
        <div>
            <button>EDIT</button> <br />
            <button onClick={() => navigate("/home")}>BACK TO HOME</button>

            <ul>
                {posts.map((post)=> {
                    return(
                        <li key={post.id}>
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                            <p>Created at {new Date(post.createdAt).toLocaleDateString()}</p>
                            <button onClick={()=> handleDelete(post.id)}>DELETE</button>
                        </li>
                    )
                })}

            </ul>
        </div> 
    )
}