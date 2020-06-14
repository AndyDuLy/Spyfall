import React from 'react';
import firebase from '../firebase';

const styles = {
  button: {
    backgroundColor: "transparent",
    borderRadius: "15px",
    color: "#FFFFFF",
    fontSize: "1.5em",
    marginTop: "2%",
    height: "1.5em",
  },

  canvas: {
    border: "2px solid #00D1FF",
    borderColor: "#00D1FF",
    borderRadius: "15px",
    boxSizing: "border-box",
    paddingTop: "5%",
    paddingBottom: "5%",
  },

  input: {
    backgroundColor: "transparent",
    borderColor: "#00D1FF",
    borderWidth: "0 0 2px 0",
    fontSize: "1.5em",
    width: "80%",
  },
}

const locationSet = [
  "Beach", "Broadway", "Theater", "Casino", "Circus", "Tent",
  "Bank", "Day Spa", "Hotel", "Restaurant", "Supermarket", "Service Station",
  "Hospital", "Embassy", "Military Base", "Police Station", "School", "University",
  "Airplane", "Ocean Liner", "Passenger Train", "Submarine",
  "Cathedral", "Corporate Party", "Movie Studio",
  "Crusader Army", "Pirate Ship", "Polar Station", "Space Station",
]

function CreateGameCard() {
  const [displayName, setDisplayName] = React.useState("");
  const [roomID, setRoomID] = React.useState("");
  const db = firebase.database();

  const submitHandler = (e) => {
    e.preventDefault();

    if (roomID && displayName) {
      var UUIDkey = db.ref("Rooms/" + roomID).push().getKey();

      db.ref("Rooms/" + roomID).set({
        PlayerSet: { [UUIDkey]: displayName } , 
        LocationSet: locationSet,
        InProgress: false,
        Spy: "none",
        Location: "none",
      })
      .then(function() { window.location.assign(`/room-${roomID}/${displayName}`); })
      .catch(function(err) { alert("Error: ", err, "Room could not be created. Try again."); });
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
            value="Create Game"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateGameCard;
