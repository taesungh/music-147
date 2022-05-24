import React from "react";

function ProgressReport() {
  return (
    <div className="container">
      <h1>Progress Report</h1>
      <p>
        I have unfortunately been quite busy these past few weeks dealing with assignments from
        other classes and some personal matters.
      </p>
      <p>
        After a considerable amount of time debugging the finnicky behavior, I was able to make a
        small amount of progress by finding a temporary workaround to the synchronization issue in
        scheduling different track types with Tone.js. This involves querying the time of the
        transport rather than using the specified time when handling scheduled events. Further
        testing is necessary to validate the stability of this workaround, but I should now be able
        to schedule <code>Tone.Part</code>, <code>Tone.Player</code>, and <code>Tone.Loop</code> to
        play synchronously.
      </p>
      <p>
        To simplify the testing process, an interactive page was created to trigger scenarios from
        the game without actually needing to run the game. With this interface, I can select the
        different types of ships that would trigger different musical tracks and listen to the
        dynamic behavior. This will save a lot of time in debugging some lingering issues with track
        scheduling.
      </p>
      <p>
        With the help of this new testing environment, I plan to convert my existing melody tracks
        to use the synthesizers in Tone.js rather than playing pre-recorded files. This will involve
        processing the note data into some usable form to trigger with a <code>Tone.Part</code>{" "}
        object. This will open up greater possibilities to implementing algorithmic composition as
        well since the notes of the melody can be adjusted on-the-fly, a process that would be much
        more difficult with pre-recorded files. However, this change introduces the challenge of
        constructing a desirable timbre using only the provided synthesizers, rather than having
        access to more advanced patches and effects in a DAW.
      </p>
      <p>
        View{" "}
        <a href="https://drive.google.com/file/d/1b38Gix0pPZatMXgytuwkbxtZZeypVlnW/view">
          code snippets
        </a>
        .
      </p>
    </div>
  );
}

export default ProgressReport;
