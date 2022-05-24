import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container home">
      <h1>Welcome</h1>
      <p>Welcome to my portfolio for MUSIC 147 (Computer Music Programming), Spring 2022.</p>

      <h2>Progress Report</h2>
      <p>
        Work done so far on the final project is described in a{" "}
        <Link to="/progress-report">progress report</Link>.
      </p>

      <h2>Project Proposal</h2>
      <p>
        To prepare for the final programming assignment, a{" "}
        <Link to="/project-proposal">project proposal</Link> was drafted.
      </p>

      <h2>Programming Assignment 4: Algorithmic Composition</h2>
      <p>
        Similar to Assignment 3, this assignment uses a physics engine to simulate objects in a
        celestial universe. Planets orbit around a center based on models of gravity and play notes
        when crossing a reference line. Several random parameters also affect the simulation.
      </p>
      <p>
        View Program 4: <Link to="/algorithmic-composition">Celestial</Link>
      </p>

      <h2>Programming Assignment 3: MIDI Control</h2>
      <p>
        This assignment consisted of using MIDI controller data to run a demo involving bouncing
        balls that produce sounds upon collision. Playing notes on a MIDI keyboard creates balls of
        a specific pitch and size, and other MIDI input signals such as the pitch bend wheel,
        modulation wheel, and sustain pedal can be used to adjust other parameters of the simulation
        including the gravity and time scale.
      </p>
      <p>
        View Program 3: <Link to="/midi-control">Music Ball</Link>
      </p>

      <h2>Programming Assignment 2: Sound File Exploration</h2>
      <p>
        Similar to Assignment 1, this assignment took prerecorded sound samples to trigger upon user
        input, but this was implemented in JavaScript instead of Max. For each sample, the sound
        data was stored in an <code>AudioBuffer</code> object which could be used as the buffer in
        an <code>AudioBufferSourceNode</code> object. Source node objects are played upon changes to
        the text input. The character code of the text determines which sample is played.
      </p>
      <p>
        View Program 2: <Link to="/sound-file-exploration">Sound File Exploration</Link>
      </p>

      <h2>Programming Assignment 1: Typing Sounds</h2>
      <p>
        This assignment consisted of creating a Max patch where sounds are played when typing on the
        computer keyboard. A subpatch was created with an <code>sfplay~</code> object that plays
        prerecorded sound files. Instances of this subpatch were loaded using the <code>poly~</code>{" "}
        object, and instances were triggered by messages sent from a <code>key</code> object which
        detects keystrokes.
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
