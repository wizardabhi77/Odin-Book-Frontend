import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Post() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    async function handlePost(e) {

        e.preventDefault();

        const res = await fetch("http://localhost:5050/post",{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })

        const data = await res.json();

        console.log(data);

        navigate("/home");
    }

    return (
        <div>
            <h1>CREATE A POST</h1>
        
        <form onSubmit={handlePost}>
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