import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookClass from './pages/BookClass';
import Confirmation from './pages/Confirmation';
import Failure from './pages/Failure';
import MyBookings from './pages/MyBookings';
import AddClass from './pages/AddClass';
import ClassFull from './pages/classFull';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <hr />
        <div className="container bg-gray-900  mx-auto p-4">
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} key={Date.now()} />} />
            <Route path="/login" render={(props) => <Login {...props} key={Date.now()} />}  />
            <Route path="/signup" render={(props) => <Signup {...props} key={Date.now()} />}  />
            <Route path="/book/:classId" render={(props) => <BookClass {...props} key={Date.now()} />}  />
            <Route path="/confirmation" render={(props) => <Confirmation {...props} key={Date.now()} />}  />
            <Route path="/failure" render={(props) => <Failure {...props} key={Date.now()} />}  />
            <Route path="/mybookings" render={(props) => <MyBookings {...props} key={Date.now()} />}  />
            <Route path="/classes/add" render={(props) => <AddClass {...props} key={Date.now()} />}  />
            <Route path="/classes/full" render={(props) => <ClassFull {...props} key={Date.now()} />}  />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
