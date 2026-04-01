import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

import styles from '../styles/profile.module.css';

export default function Profile() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    const [user, setUser] = useState(null);

    const [file, setFile ] = useState(null);

    const [mode, setMode] = useState("view");

    const [picmode, setPicmode] = useState(true);

    const token = localStorage.getItem("token");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        async function getPosts() {

            const res = await fetch("https://odin-book-backend-mbe2.onrender.com/post/user",{
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

        async function getUSer () {
            
            const res = await fetch("https://odin-book-backend-mbe2.onrender.com/user",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : "Bearer " + token 
                },
                });

            const user = await res.json();

           

            setUser(user);

            
        }

        getUSer();
    }, [token])

    async function handleEdit(e) {
        
        e.preventDefault();

       

        const res = await fetch("https://odin-book-backend-mbe2.onrender.com/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        if (!res.ok) {
        const text = await res.text();
        console.log("Server error:", text);
        return;
    }

        const data = await res.json();

        
        setMode("view");
    }

    async function handlePic(e) {

        const formData = new FormData();

        formData.append("image", file);

        const res = await fetch("https://odin-book-backend-mbe2.onrender.com/profilePic",{
            method: "POST",
            headers: {
                Authorization: "Bearer " + token
            },
            body: formData
        }
        )

        const data  = await res.json();

        setUser(data);
    }

    

    async function handleDelete(postId) {

        const res = await fetch("https://odin-book-backend-mbe2.onrender.com/post/delete",{
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

        setPosts(newPosts);
    }

    return (
        <div className={styles.profile}>
           {mode === "view" && (user? <div>
                {picmode?(<img src={user.profilePic} alt="profilePic" />): (
                  
                  <>
                    
                    <label htmlFor="profilePic">Profile Picture:</label>

                    {file && (
                        <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            width="100"
                        />
                    )}

                    <input
                        id="profilePic"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                  </>)}
                <button onClick={() => setPicmode(!picmode)}>CHANGE PIC</button>
                <h1>Username:{user.username}</h1>
                <h1>Email:{user.email}</h1>

            </div>
            : <h1>Loading</h1>)}

            {mode === "edit" &&

            <form onSubmit={handleEdit} className={styles.editForm}>
            
            <label htmlFor="username">USERNAME:</label>
            <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
            <label htmlFor="email">EMAIL:</label>
            <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
            <label htmlFor="password">PASSWORD:</label>
            <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
            <button type="submit">SUBMIT</button>
            </form>
            
            }
            
           
            <button onClick={() => setMode(mode === "view" ? "edit" : "view")}>{mode === "view"? "EDIT": "CANCEL"}</button> <br />
            <button onClick={() => navigate("/home")}>BACK TO HOME</button>

            <h2>Your Posts</h2>
            <ul className={styles.feed}>
                
                {posts.map((post)=> {
                    return(
                        <li key={post.id} className={styles.post}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <p className={styles.content}>{post.content}</p>
                            <p className={styles.date}>Created at {new Date(post.createdAt).toLocaleDateString()}</p>
                            <button onClick={()=> handleDelete(post.id)}>DELETE</button>
                        </li>
                    )
                })}

            </ul>
        </div> 
    )
}