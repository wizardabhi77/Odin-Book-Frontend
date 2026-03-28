import { useState } from "react"
import { useNavigate } from "react-router-dom";

import styles from '../styles/postForm.module.css';

export default function Post() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    async function handlePost(e) {

        e.preventDefault();

        const res = await fetch("https://odin-book-backend-mbe2.onrender.com/post",{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        });   

        navigate("/home");
    }

    return (
        <div className={styles.postPage}>
            <h1>CREATE A POST</h1>
        
        <form onSubmit={handlePost} className={styles.postForm}>
            <label htmlFor="title">TITLE OF THE POST:</label>
            <input type="text" name="title" value={title} onChange={(e)=> setTitle(e.target.value)}/> <br />
            <label htmlFor="content">CONTENT:</label>
            <textarea name="content" value={content} onChange={(e)=> setContent(e.target.value)}></textarea> <br />
            <button type="submit">POST</button>
        </form>
        <button onClick={()=> navigate("/home")}>BACK</button>
        </div>
    )
}