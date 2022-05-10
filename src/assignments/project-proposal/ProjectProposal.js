import React from "react";

function ProjectProposal() {
  return (
    <div className="container">
      <h1>Project Proposal</h1>
      <p>My proposal for the final programming project for this course.</p>

      <h2>Preface</h2>
      <p>
        The summer after the pandemic started, I was back home for the summer and was able to meet
        up with a high school friend to work on some programming projects. One of the things we
        ended up doing was building a multiplayer, online io-game (casual game that runs in a web
        browser, e.g. <a href="https://agar.io">agar.io</a> and{" "}
        <a href="https://slither.io">slither.io</a>). Our game consists of players working together
        as a team to control a ship and battle against various enemy ships.
      </p>
      <p>
        Last year, I was able to put together some very basic music for the game, but the
        implementation was quite rough. There were two main themes: one for moving around in the
        overworld and one for when battling against enemy ships. The game had hard transitions
        between the two themes, and if a ship bobbed in and out of view, the music could awkwardly
        switch repeatedly between the two tracks. Each track also had an intro phrase which wasn't
        looped cleanly.
      </p>
      <p>
        While taking MUSIC 47 last quarter, I was motivated by a YouTube video by Scruffy regarding{" "}
        <a href="https://www.youtube.com/watch?v=NkBXgcN3fXo">
          the complexity of the music involved in Wii Play's Tanks
        </a>
        . Scruffy describes how the game starts off with a basic four-bar melody line and drum beat
        but becomes progressively more layered depending on the enemy tanks present in the current
        level: e.g. when there is a yellow tank visible, additional instruments such as cymbals and
        bass drum are added to the music. There are also different timpani patterns depending on the
        number of tanks.
      </p>
      <p>
        Taking inspiration from this behavior, I worked on implementing a similar dynamic music
        system to play different tracks for the various types of enemy ships. I broke up the
        existing music into several reusable loops and composed some new variations on the themes. I
        then used <a href="https://tonejs.github.io">Tone.js</a> to orchestrate these tracks
        together using the provided Transport module. With inspiration from Teerath, I also
        programmed a dynamic drummer that adjusts its intensity based on the amount of enemies on
        screen.
      </p>
      <h2>Objectives</h2>
      <p>
        For the final course project, I aim to improve upon my work done previously in MUSIC 47 for
        my dynamic music system in my video game project and further develop a more engaging video
        game experience. While I was able to associate different themes to specific types of enemy
        ships, there are still various bugs in the transitions between musical themes I wish to
        address. Additionally, I had previously wished to use custom synthesizers in the browser to
        play the themes live, but I could not figure out how to properly synchronize the playback
        between these instruments and other sample-based instruments. I had spent a considerable
        amount of time attempting to debug the synchronization with the transport to no avail so
        ultimately used prerecorded files of the melodies.
      </p>
      <p>
        My main goal would be to fix the timing and synchronization issues to have the melodies
        played by synthesizers in the browser. Additionally, I aim to implement additional
        variations to the characteristics sounds produced depending on various parameters derived
        from what is happening in the game. As this game needs to be played in a web browser,
        programming will be done entirely in JavaScript (or TypeScript). The user will experience
        this live "performance" by playing the game and controlling parts of the player's ship and
        interacting with the enemy ships.
      </p>

      <h3>Projected Timeline</h3>
      <ul>
        <li>Find a resolution to the synchronization issue (~2 to 5 days)</li>
        <li>
          Convert the note data from the existing melodies into a format fit for playback with
          Tone.js (&lt;1 day)
        </li>
        <li>Experiment with parameters of synthesizers to find a fitting timbre (~2 to 3 days)</li>
        <li>
          Integrate additional control of sound characteristics based on gameplay (~3 to 4 days)
        </li>
      </ul>
    </div>
  );
}

export default ProjectProposal;
