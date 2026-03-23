import { useNavigate } from "react-router-dom"

export default function Profile() {

    const navigate = useNavigate();

    return (
        <div>
            <button>EDIT</button> <br />
            <button onClick={() => navigate("/home")}>BACK TO HOME</button>
        </div>
    )
}