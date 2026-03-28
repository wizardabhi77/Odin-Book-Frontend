
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/register.module.css';

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    async function handleRegister(e) {
        
        e.preventDefault();

        const res = await fetch("https://odin-book-backend-mbe2.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await res.json();

        console.log(data);

        navigate("/");
    }

    return (
        <div className={styles.registerPage}>
            <h1>VICE CITY</h1>
       
        <form onSubmit={handleRegister} className={styles.registerForm}>
            <label htmlFor="username">USERNAME:</label>
            <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
            <label htmlFor="email">EMAIL:</label>
            <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
            <label htmlFor="password">PASSWORD:</label>
            <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
            <button type="submit" className={styles.registerBtn}>REGISTER</button>
        </form>

        <button onClick={()=> navigate("/")}>BACK</button>
         </div>
    )
}