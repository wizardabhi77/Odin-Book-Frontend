
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

   

    const [user, setUser] = useState(null);
    const [friendsList, setFriendsList] = useState([]);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(()=> {

        async function getUSer () {
            
            const res = await fetch("http://localhost:5050/user",{
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

        async function getFriends () {

            const res = await fetch("http://localhost:5050/friends",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : "Bearer " + token 
                },
            });

            const friends = await res.json();

            setFriendsList(friends);
        }

        getFriends();
    }, [token])

    async function handleProfile() {

        navigate("/profile");
        
    }

    if(!user) return <h1>LOADING...</h1>

    return (
        <div>
            <h1>HOME</h1>

            <h2>WELCOME {user.username}</h2>

            <button onClick={handleProfile}>PROFILE</button> <br /> <br />

            <h2>FRIENDS U NEED TO MAKE</h2>
            <ul>
                {friendsList.map((friend) => {
                    return (
                        <li key={friend.id}>
                            <h3>{friend.username}</h3>
                            <button>MAKE FRIEND</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}  