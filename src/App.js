import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
