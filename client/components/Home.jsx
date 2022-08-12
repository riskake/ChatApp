import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Navbar from "./Navbar";
import Chat from "./Chat";

const Home = () => {
  const socket = io.connect("http://localhost:3000");

  const [userName, setUserName] = useState("Eksempelbruker");
  const [roomID, setRoomID] = useState();
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
      setShowChat(true);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="home_container">
        <h1>ChatApp</h1>
        <p className="home_subheader">Beste chatte-app siden 2022...</p>
        {!showChat ? (
          <div className="chat_container">
            <div>
              <h3>Bli med i et chatterom!</h3>
              <input
                type="text"
                placeholder="Rom ID"
                onChange={(event) => {
                  setRoomID(event.target.value);
                }}
              ></input>
              <button onClick={joinRoom}>Bli med</button>
            </div>
          </div>
        ) : (
          <Chat socket={socket} userName={userName} room={roomID}></Chat>
        )}
      </div>
    </div>
  );
};

export default Home;
