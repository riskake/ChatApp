import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(false);
    const [userNameToBeCreated, setUserNameToBeCreated] = useState("");
    const [passwordToBeCreated, setPasswordToBeCreated] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userNameInput, setUserNameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const loginFunction = (event) => {
        event.preventDefault();
        if (userName === userNameInput && password === passwordInput) {
            navigate("/home");
        }
        else {
            alert("Feil brukernavn eller passord :(");
            setUserNameInput("");
            setPasswordInput("");
        }
    }

    const createUser = (event) => {
        event.preventDefault();
        if (userNameToBeCreated !== "" && passwordToBeCreated !== "") {
            alert("Bruker opprettet!")
            setShowLogin(true);
            setUserName(userNameToBeCreated);
            setPassword(passwordToBeCreated);
        }
        else {
            alert("Vennligst skriv inn både et brukernavn og et passord")
        }
        setUserNameToBeCreated("");
        setPasswordToBeCreated("");
    }

    return (
    <div className="login_container">
        <h1>Login</h1>
        {!showLogin ? (
            <div className="login_loginGroup">
                <p className="login_subHeader">Opprett en bruker</p>
                <form onSubmit={(e) => {createUser(e)}}>
                    <input 
                        type="text" 
                        placeholder="Brukernavn..." 
                        value={userNameToBeCreated}
                        onChange={(e) => setUserNameToBeCreated(e.target.value)}>
                    </input>
                    <br/><br/>
                    <input 
                        type="password" 
                        placeholder="Passord..."
                        value={passwordToBeCreated} 
                        onChange={(e) => setPasswordToBeCreated(e.target.value)}>
                    </input>
                    <br/><br/>
                    <input type="submit" value="Create"></input>
                </form>
            </div>
        ) : (
            <div className="login_loginGroup">
                <p className="login_subHeader">Logg inn</p>
                <form onSubmit={(e) => {loginFunction(e)}}>
                    <input 
                        type="text" 
                        placeholder="Brukernavn..." 
                        value={userNameInput}
                        onChange={(e) => setUserNameInput(e.target.value)}>
                    </input>
                    <br/><br/>
                    <input 
                        type="password" 
                        placeholder="Passord..." 
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}>
                    </input>
                    <br/><br/>
                    <input type="submit" value="Logg inn"></input>
                </form>
            </div>
        )}
        
        <div className="login_linkGroup">
            <p>Har du ikke en bruker?</p>
            <a href="https://www.w3schools.com">Lag en bruker</a>
        </div>
    </div>
 )
}

export default Login;