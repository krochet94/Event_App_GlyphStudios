import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import NewUser from "./components/user/NewUser";
import NewEvent from "./components/event/NewEvent";
import Event from "./components/event/Event";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/users" exact element={<Users />} />
          <Route path="/newUser" exact element={<NewUser />} />
          <Route path="/newEvent" exact element={<NewEvent />} />
          <Route path="/event/:id" exact element={<Event />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
