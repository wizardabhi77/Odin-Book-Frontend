import { useEffect, useState } from "react";

import styles from "../styles/comment.module.css";

export default function Comment ({ postId }) {

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {

        async function getComments() {

            const res = await fetch(`https://odin-book-backend-mbe2.onrender.com/comment/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + token
                }
            });

            const data = await res.json();

           
            setComments(data);
        }

        getComments();
    },[token, postId])

    async function handleComment(e) {

        e.preventDefault();

        const res = await fetch("https://odin-book-backend-mbe2.onrender.com/comment/create", {
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
        <div className={styles.commentContainer}>
            <form onSubmit={handleComment} className={styles.commentForm}>
                    <input type="text" name='comment' value={text} onChange={(e)=> setText(e.target.value)} />
                    <button  type="submit" >COMMENT</button>
            </form>
            <ul className={styles.commentList}>
                {(comments.length == 0)?<p>No Comments Yet</p> :comments?.map((comment) => {
                    return(
                       <li key={comment.id} className={styles.comment}>
                        
                            <h4 className={styles.commentText}>{comment.text}</h4>
                            <p className={styles.commentAuthor}>  -{comment.user?.username}</p>
                       
                        
                       </li> 
                    )
                })}
            </ul>
        </div>
    )
}