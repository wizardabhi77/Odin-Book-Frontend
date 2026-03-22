
import { useState } from 'react';

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <form>
            <label htmlFor="username">USERNAME:</label>
            <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
            <label htmlFor="email">EMAIL:</label>
            <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
            <label htmlFor="password">PASSWORD:</label>
            <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
            <button type="submit">REGISTER</button>
        </form>
    )
}