const Home = () => {
    return(
        <div className="homeHeader">
            <h1>ChatApp</h1>
            <p className="homeSubheader">Best online chat since 2022...</p>
            <div className="chatContainer">
                <div className="chatbox"></div>
                <div className="typeContainer">
                    <input></input>
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Home;