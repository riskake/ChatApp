import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const toLogin = () => {
        navigate("/");
    }

    return(
        <div className="navbar">
            <button onClick={toLogin} className="navbar_loginButton">Logg ut</button>
        </div>
    )
}

export default Navbar;