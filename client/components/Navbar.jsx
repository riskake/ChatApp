import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const toLogin = () => {
        navigate("/login");
    }

    return(
        <div className="navbar">
            <button onClick={toLogin} className="navbar_loginButton">Log out</button>
        </div>
    )
}

export default Navbar;