import React, { useEffect } from 'react';
import firebase from '../firebase';
import '../App.css';

const styles = {
  button: {
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    borderRadius: "15px",
    color: "#FFFFFF",
    fontSize: "1.5em",
    marginTop: "2%",
    height: "1.5em",

    close: {
      backgroundColor: "transparent",
      borderColor: "#FF0000",
      borderRadius: "15px",
      color: "#FF0000",
      fontSize: "1em",
      marginBottom: "5%",
    },

    div: {
      marginTop: "5%",
    },
  },

  canvas: {
    backgroundColor: "#303030",
    height: "100vh",
    textAlign: "center",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    color: "#00D1FF",
    fontSize: "3em",
    fontWeight: 300,
  },

  info: {
    color: "#00D1FF",
    fontWeight: 200,
  },

  link: {
    textDecoration: "none",
  },

  lobbyBox: {
    border: "2px solid",
    borderColor: "#00D1FF",
    borderRadius: "15px",
    boxSizing: "border-box",

    padding: "5%",
    width: "90%",
  },

  subheading: {
    color: "#FFFFFF",
    fontWeight: 300,
  },

  whiteText: {
    color: "#FFFFFF",
  },
}

function Room() {
  const URL = window.location.pathname.split('/');
  // [rt-spyfall.web.app, room-000, p1]
  const roomExtension = URL[1].substring(5, URL[1].length);
  const playerName = URL[2];
  //const roomExtension = window.location.href.substring(window.location.href.lastindexOf("-") + 1, window.location.href.lastIndexOf("/"));
  //const playerName = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);

  const db = firebase.database();
  const dbRef = db.ref('Rooms/' + roomExtension + '/PlayerSet');
  const gameStarted = db.ref('Rooms/' + roomExtension + '/InProgress');
  const spyRef = db.ref('Rooms/' + roomExtension + '/Spy');
  const locationRef = db.ref('Rooms/' + roomExtension + '/Location');

  const [playerLobby, setPlayerLobby] = React.useState([]);
  const [gameInProgress, setGameInProgress] = React.useState(false);
  const [isSpy, setIsSpy] = React.useState(false);
  const [location, setLocation] = React.useState('');

  const locationSet = [
    "Beach", "Broadway", "Theater", "Casino", "Circus", "Tent",
    "Bank", "Day Spa", "Hotel", "Restaurant", "Supermarket", "Service Station",
    "Hospital", "Embassy", "Military Base", "Police Station", "School", "University",
    "Airplane", "Ocean Liner", "Passenger Train", "Submarine",
    "Cathedral", "Corporate Party", "Movie Studio",
    "Crusader Army", "Pirate Ship", "Polar Station", "Space Station",
  ];

  useEffect(() => {
    gameStarted.on('value', function(snapshot) {
      setGameInProgress(snapshot.val());
    });

    dbRef.on('value', function(snapshot) {
      var resultObject = snapshot.val();
      setPlayerLobby(Object.values(resultObject));
    });

    spyRef.on('value', function(snapshot) {
      if (snapshot.val() === playerName) setIsSpy(true);
      else setIsSpy(false);
    });

    locationRef.on('value', function(snapshot) {
      setLocation(snapshot.val());
    });

    return () => { 
      dbRef.off();
      gameStarted.off();
      spyRef.off();
      locationRef.off();
    }
  }, [dbRef, gameStarted, spyRef, locationRef])

  function changeGameStatus(toWhich) {
    if (toWhich === 'start') {
      if (playerLobby.length > 1) {
        var startGameState = {};
        startGameState['Rooms/' + roomExtension + '/InProgress'] = true;
        db.ref().update(startGameState);
  
        var max = playerLobby.length - 1;
        var randInt = Math.floor(Math.random() * (max + 1));

        var newSpy = playerLobby[randInt];
        var setNewSpy = {};
        setNewSpy['Rooms/' + roomExtension + '/Spy'] = newSpy;
        db.ref().update(setNewSpy);

        max = locationSet.length - 1;
        randInt = Math.floor(Math.random() * (max + 1));

        var newLocation = locationSet[randInt];
        var setNewLocation = {};
        setNewLocation['Rooms/' + roomExtension + '/Location'] = newLocation;
        db.ref().update(setNewLocation);
      } else alert("Game cannot be started with only one player.");
    } else if (toWhich === 'end') {
      var endGameState = {};
      endGameState['Rooms/' + roomExtension + '/InProgress'] = false;
      db.ref().update(endGameState);

      var clearSpy = {};
      clearSpy['Rooms/' + roomExtension + '/Spy'] = 'none';
      db.ref().update(clearSpy);

      var setNewLocation = {};
      setNewLocation['Rooms/' + roomExtension + '/Location'] = 'none';
      db.ref().update(setNewLocation);
    } else if (toWhich === 'close') {
      db.ref('Rooms/' + roomExtension).remove();
      window.location.assign(`/`);
    }
  }

  function renderSpyOrLocation() {
    if (isSpy) return <h3 style={styles.info}> <span style={styles.whiteText}> You are the </span> spy </h3>
    else return <h3 style={styles.info}> Location: <span style={styles.whiteText}> {location} </span> </h3>
  }

  function renderLobbyOrGame() {
    if (gameInProgress) {
      return (
        <>
          {renderSpyOrLocation()}
          <h1 style={styles.subheading}> Possible Locations: </h1>

          <ul>
            {locationSet.map(location => (
              <li key={location}>
                <span style={styles.info}> {location} </span>
              </li>
            ))}
          </ul>

          <div style={styles.button.div}>
            <button onClick={() => changeGameStatus('end')} style={styles.button}> End Game </button> <br/>
          </div>
        </>
      )
    } else {
      return (
        <>
          <h3 style={styles.info}> Room {roomExtension} | {playerName} </h3>
          <h1 style={styles.subheading}> Players in lobby: </h1>
  
          {playerLobby.map(function(player) {
            return <h4 style={styles.info} key={player}> {player} </h4>
          })}
  
          <button onClick={() => changeGameStatus('start')} style={styles.button}> Start Game </button> <br/>
        </>
      )
    }
  }

  return (
    <div style={styles.canvas}>
      <a href="/" style={styles.link}>
        <h1 style={styles.heading}> Spyfall </h1>
      </a>

      <button onClick={() => changeGameStatus('close')} style={styles.button.close}> Close Game </button>

      <div style={styles.lobbyBox}>
        {renderLobbyOrGame()}
      </div>
    </div>
  );
}

export default Room;
