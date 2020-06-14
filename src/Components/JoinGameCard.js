import React from 'react';
import firebase from '../firebase';


const styles = {
  button: {
    backgroundColor: "transparent",
    borderColor: "#00D1FF",
    borderRadius: "15px",
    color: "#00D1FF",
    fontSize: "1.5em",
    marginTop: "2%",
    height: "1.5em",
  },

  canvas: {
    border: "2px solid",
    borderColor: "#FFFFFF",
    borderRadius: "15px",
    boxSizing: "border-box",
    paddingTop: "5%",
    paddingBottom: "5%",
  },

  input: {
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    borderWidth: "0 0 2px 0",
    fontSize: "1.5em",
    width: "80%",
  },
}

function JoinGameCard() {
  const [displayName, setDisplayName] = React.useState("");
  const [roomID, setRoomID] = React.useState("");
  const db = firebase.database();

  const submitHandler = (e) => {
    e.preventDefault();

    if (roomID && displayName) {
      db.ref('Rooms').once('value', function(snapshot) {
        if (snapshot.hasChild(roomID)) {
          var players = Object.values(snapshot.child(roomID + '/PlayerSet').val()).indexOf(`${displayName}`) >= 0;

          if (!players) {
            db.ref('Rooms/' + roomID + '/PlayerSet').push(displayName);
            window.location.assign(`/room-${roomID}/${displayName}`);
          } else alert('Player with that name already in the room. Re-try with a different name.')
        } else alert('Room does not exist. Enter another ID or create a room.');
      });
    } else alert("Room ID and Display Name cannot be empty.");
  }

  return (
    <div style={styles.canvas}>
      <form onSubmit={submitHandler}>
        <div> 
          <input 
            style={styles.input}
            placeholder="Room ID"
            value={roomID}
            onChange={e => setRoomID(e.target.value)}
          /> 
        </div> <br/>

        <div> 
          <input
            style={styles.input}
            placeholder="Display Name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          /> 
        </div> <br/>

        <div>
          <input 
            style={styles.button}
            type="submit"
            value="Join Game"
          />
        </div>
      </form>
    </div>
  );
}

export default JoinGameCard;
