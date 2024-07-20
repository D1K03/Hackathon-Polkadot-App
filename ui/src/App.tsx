import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landingpage } from "./components/Landingpage";
import Auth from "./components/Auth";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path=":auth_id/chat"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
