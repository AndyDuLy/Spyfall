import React from 'react';
import CreateGameCard from './CreateGameCard';
import JoinGameCard from './JoinGameCard';


const styles = {
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
}

function Landing() {
  return (
    <div style={styles.canvas}>
      <h1 style={styles.heading}> Spyfall </h1>
      <CreateGameCard/> <br/>
      <JoinGameCard/>
    </div>
  );
}

export default Landing;
