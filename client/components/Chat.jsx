import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, userName, roomID }) => {
  const [currentMessage, setCurrentMessage] = useState();
  const [messageList, setMessageList] = useState([]);

  const saveMessage = async (req, res) => {
    try {
      await fetch("/api/message/postmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          userName: userName,
        }),
      })
        .then((res) => {
          return res.json;
        })
        .then((data) => {
          if (data.status === "OK") {
            alert("The message was posted");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      alert(error);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomID,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      saveMessage();
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;

// GET ALL MESSAGES AND SET THEM TO THE STATE GETMESSAGES
// const getMessages = async () => {
//   try {
//       await fetch("/api/message/getmessages", { method: "GET", headers: { "Content-Type": "application/json"}})
//           .then((res) => { return res.json() })
//           .then((data) => { setMessageList(data)})
//           .catch((error) => {
//               alert(error);
//           });
//   } catch(error) {
//       alert(error);
//   };
// };
//   useEffect (() => {
//     getMessages();
// }, []);
