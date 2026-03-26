import { useEffect, useState } from "react"

export default function Comment ({ postId }) {

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {

        async function getComments() {

            const res = await fetch(`http://localhost:5050/comment/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + token
                }
            });

            const data = await res.json();

            console.log(data);
            setComments(data);
        }

        getComments();
    },[token, postId])

    async function handleComment(e) {

        e.preventDefault();

        const res = await fetch("http://localhost:5050/comment/create", {
            method: "POST",
            headers: {
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                postId: postId,
                text: text
            })
        });

        const newComment = await res.json();

        if(!res.ok){
            return "FETCH FAILED"
        }

        setComments((prev)=> [...prev, newComment]);
        setText("");
    }

    

    return(
        <div>
            <form onSubmit={handleComment}>
                    <input type="text" name='comment' value={text} onChange={(e)=> setText(e.target.value)}/>
                    <button  type="submit" >COMMENT</button>
            </form>
            <ul>
                {(comments.length == 0)?<p>No Comments Yet</p> :comments?.map((comment) => {
                    return(
                       <li key={comment.id}>
                        <h4>{comment.text}</h4>
                        <p>By {comment.user?.username}</p>
                       </li> 
                    )
                })}
            </ul>
        </div>
    )
}