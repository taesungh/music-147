import React from "react";

function Home() {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <p>
        Welcome to my portfolio for MUSIC 147 (Computer Music Programming),
        Spring 2022.
      </p>
      <h2>Programming Assignment 1: Typing Sounds</h2>
      <p>
        This assignment consisted of creating a Max patch where sounds are
        played when typing on the computer keyboard. A subpatch was created with
        an <code>sfplay~</code> object that plays prerecorded sound files.
        Instances of this subpatch were loaded using the <code>poly~</code>{" "}
        object, and instances were triggered by messages sent from a{" "}
        <code>key</code> object which detects keystrokes.
      </p>
      <p>
        View{" "}
        <a href="https://drive.google.com/file/d/1vizZmamUCo0N4RZt9b95fUzV75_G8geJ/view">
          Program 1
        </a>
      </p>
    </div>
  );
}

export default Home;
