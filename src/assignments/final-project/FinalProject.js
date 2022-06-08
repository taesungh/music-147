import React from "react";

function FinalProject() {
  return (
    <div className="container">
      <h1>Final Project</h1>
      <p>
        For my final course project, with permission from the instructor, I improved upon work I had
        previously done in MUSIC 47 to develop a dynamic music system for a video game project. This
        system orchestrates various tracks of music and a live drummer to match the complexity of
        the game as different events occur. This quarter, I focused on resolving track
        synchronization issues, creating a simpler testing interface, and converting tracks to use
        synthesizers and note data rather than prerecorded files.
      </p>
      <p>
        View <a href="https://admirals-dev-temp.herokuapp.com/">live demo</a>. Enter any username
        and room. The game is usually played in teams of three, but you can select a role and click
        Ready and choose the option to play with computer teammates. Controls for each role are
        shown by clicking the question mark icon next to the name of the role.
      </p>
      <p>
        View <a href="https://admirals-dev-temp.herokuapp.com/music-test">test interface</a>.
      </p>
      <p>
        View{" "}
        <a href="https://drive.google.com/file/d/1tavTGLwOY4KMB5E2X3GMZvcG5nnpP2gw/view?usp=sharing">
          final project report
        </a>
        .
      </p>
      <p>
        View{" "}
        <a href="https://drive.google.com/file/d/1N9l1IdsGoPv7IGlql8oYuFMDMxVHWj24/view?usp=sharing">
          code snippets
        </a>
        .
      </p>
    </div>
  );
}

export default FinalProject;
