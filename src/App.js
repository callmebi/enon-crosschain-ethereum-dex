import React, { Component } from 'react';
// import logo from './logo.svg';
import Login from './features/Login/Login';
import Dashboard from './pages/Dashboard/DashboardPage';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Dashboard />
				<Login />
			</div>
		);
	}
}

export default App;
