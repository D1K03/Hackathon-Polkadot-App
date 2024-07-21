import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landingpage } from "./components/Landingpage";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import NotFound from "./components/NotFound";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path=":auth_id/chat" element={<Chat />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
