
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/home.module.css';

import Feed from './Feed.jsx';

export default function Home() {

   

    const [user, setUser] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const [token, setToken] = useState(null);

    const [sideBar, setSideBar] = useState(false);

   

    const navigate = useNavigate();

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

    async function getFriends () {

            const res = await fetch("https://odin-book-backend-mbe2.onrender.com/friends",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : "Bearer " + token 
                },
            });

            const friends = await res.json();

            setFriendsList(friends);
        }

    useEffect(()=> {

        setToken(localStorage.getItem("token"));

        if(!token) return;

        getUSer();

        

        getFriends();
    }, [token])

    async function handleLogout() {

        localStorage.removeItem("token");
        navigate("/");
    }

    async function handleFollow(fid) {

        const res = await fetch("https://odin-book-backend-mbe2.onrender.com/follow", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : "Bearer " + token 
            },
            body: JSON.stringify({
                followId: fid
            })
        });

        const data = await res.json();

        if(!res.ok){
            console.log("FETCH FAILED");
            return;
        }

      

        getUSer();
        getFriends();
    }

    async function handleUnFollow(fid) {

        const res = await fetch("https://odin-book-backend-mbe2.onrender.com/unfollow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body : JSON.stringify({
                followId : fid
            })       
        });

        const data = await res.json();

        if(!res.ok){
            console.log("unfollow Failed");
            return;
        }

        getUSer();
        getFriends();
    }

    

    if(!user) return <h1>LOADING...</h1>

    return (
        <div className={styles.home}>

            <div className={styles.navBar}>

                <h1>VICE CITY</h1>

                <h2>WELCOME {user.username}</h2>

                <button onClick={()=> navigate("/profile")} className={styles.profile}>PROFILE</button> 

                <button onClick={()=> navigate("/post")} className={styles.post}>CREATE A POST</button>

                <button onClick={() => setSideBar(!sideBar)} className={styles.menu}>☰</button>

            </div>
            
            {sideBar && (
                 <div className={`${styles.sideBar} ${sideBar ? styles.open : styles.closed}`}>
                
                        <h2>FRIENDS U NEED TO MAKE</h2>
                    <ul>
                        {friendsList.map((friend) => {
                            return (
                                <li key={friend.id}>
                                    <h3>{friend.username}</h3>
                                    <button onClick={()=> handleFollow(friend.id)}>FOLLOW</button>
                                </li>
                            )
                        })}
                    </ul>

                    <h2>FOLLOWERS</h2>
                    <ul>
                        {user.followers?.map((f)=> {
                            return (
                                <li key={f.follower.id}>
                                    <h3>{f.follower.username}</h3>
                                    
                                </li>
                            )
                        })}
                    </ul>

                    <h2>FOLLOWING</h2>
                    <ul>
                        {user.following?.map((f) => {
                            return (
                                <li key={f.following.id}>
                                    <h3>{f.following.username}</h3>
                                    <button onClick={()=> handleUnFollow(f.following.id)}>UNFOLLOW</button>
                                </li>
                            )
                        })}
                    </ul>

                    <button onClick={handleLogout}>LOGOUT</button>
            </div>
            )}
           

            <Feed />

           
        </div>
    )
}  