import { Route, Routes } from "react-router-dom";

import {
  AlgorithmicComposition,
  FinalProject,
  MidiControl,
  ProgressReport,
  ProjectProposal,
  SoundFileExploration,
} from "./assignments";
import { Home } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Taesung Hwang
        <br />
        MUSIC 147 Portfolio
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sound-file-exploration" element={<SoundFileExploration />} />
        <Route path="/midi-control" element={<MidiControl />} />
        <Route path="/algorithmic-composition" element={<AlgorithmicComposition />} />
        <Route path="/project-proposal" element={<ProjectProposal />} />
        <Route path="/progress-report" element={<ProgressReport />} />
        <Route path="/final-project" element={<FinalProject />} />
      </Routes>
    </div>
  );
}

export default App;
