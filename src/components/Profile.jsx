import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

export default function Profile() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    const [user, setUser] = useState(null);

    const [mode, setMode] = useState("view");

    const token = localStorage.getItem("token");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

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

        async function getUSer () {
            
            const res = await fetch("http://localhost:5050/user",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : "Bearer " + token 
                },
                });

            const user = await res.json();

            console.log(user);

            setUser(user);

            
        }

        getUSer();
    }, [token])

    async function handleEdit(e) {
        
        e.preventDefault();

        const res = await fetch("http://localhost:5050/edit", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await res.json();

        console.log(data);

        setMode("view");
    }

    

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
           {mode === "view" ?(user? <div>
                <h1>Username:{user.username}</h1>
                <h1>Email:{user.email}</h1>
            </div>
            : <h1>Loading</h1>): 
            <form onSubmit={handleEdit}>
            <label htmlFor="username">USERNAME:</label>
            <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
            <label htmlFor="email">EMAIL:</label>
            <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
            <label htmlFor="password">PASSWORD:</label>
            <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
            <button type="submit">SUBMIT</button>
            </form>
            }
            <button onClick={() => setMode("edit")}>EDIT</button> <br />
            <button onClick={() => navigate("/home")}>BACK TO HOME</button>

            <ul>
                <h2>Your Posts</h2>
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