import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Home = () => {

    const [messagesToShow, setMessagesToShow] = useState();
    const [messageToSend, setMessageToSend] = useState("");
    
    const getMessages = async () => {
        try {
            await fetch("/api/message/getmessages", { method: "GET", headers: { "Content-Type": "application/json"}})
                .then((res) => { return res.json() })
                .then((data) => { setMessagesToShow(data)})
                .catch((error) => { 
                    alert(error);
                });
        } catch(error) {
            alert(error);
        };
    };

    useEffect (() => {
        getMessages();
    }, []);

    const sendMessage = async (req, res) => {
        try {
            await fetch("/api/message/postmessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: messageToSend,
                    userName: "Pelle",
                })
            }).then((res) => { return res.json })
                .then((data) => { 
                    if (data.status === "OK") {
                        alert("The message was posted");
                    } 
                }).catch((error) => { 
                    console.log(error);
                });
        }
        catch(error) {
            alert(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    return(
        <div>
            <Navbar></Navbar>
            <div className='home_container'>
                <h1>ChatApp</h1>
                <p className="home_subheader">Beste chatte-app siden 2022...</p>
                <div>
                    <div className="chatbox">
                    {
                        // messages.Map((item, index) => (
                        //     <li key={item._id}>
                        //         {item.message}
                        //     </li>
                        // ))
                    }
                    </div>
                    <div className="type_container">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input type="text" value={messageToSend} placeholder="Skriv en melding..." onChange={(e) => setMessageToSend(e.target.value)} />
                            <input type="submit" value="Send"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;