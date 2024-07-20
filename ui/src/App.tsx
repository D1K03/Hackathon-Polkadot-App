import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landingpage } from "./components/Landingpage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
