import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const loginFunction = () => {
        navigate("/");
    }

    return (
    <div className="login_container">
        <h1>Login</h1>
        <div className="login_loginGroup">
            <form onSubmit={loginFunction}>
                <input type="text" placeholder="Brukernavn..."></input>
                <br/><br/>
                <input type="text" placeholder="Passord..."></input>
                <br/><br/>
                <input type="submit" value="Logg inn"></input>
            </form>
        </div>
        
        <div className="login_linkGroup">
            <p>Har du ikke en bruker?</p>
            <a href="https://www.w3schools.com">Lag en bruker</a>
        </div>
    </div>
 )
}

export default Login;