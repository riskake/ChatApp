import React, { useState, useEffect } from 'react';

const Home = () => {

    const [messagesToShow, setMessagesToShow] = useState([{message: "hei", userName: "Pelle"}]);
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
            console.log(error);
        };
    };

    useEffect (() => {
        getMessages();
    }, []);

    const sendMessage = async () => {
        await fetch('/api/message/postmessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: messageToSend,
                userName: "Pelle",
            })
        }).then((res) => { return res.json })
            .then((data) => { 
                if (data.status === "OK") {
                    alert("The message was posted")
                } 
            }).catch((error) => { 
                console.log(error) 
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    return(
        <div className="home_header">
            <h1>ChatApp</h1>
            <p className="home_subheader">Best online chat since 2022...</p>
            <div className="chat_container">
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
    );
}

export default Home;