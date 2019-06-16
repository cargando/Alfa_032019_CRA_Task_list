import React from 'react';
import './App.css';
import Navigation from './components/nav';
import { NAV_ITEMS, NAV_MAIN } from './lib/nav_data';
import { MainTab } from './scenes/main';
import "./calendar.css";

class App extends React.Component {

	render() {

		return (
			<React.Fragment>
				<div className="container">
					<h1>CRA Task List</h1>
					<Navigation />
					{
						this.props.children
					}
				</div>
			</React.Fragment>
		);

	}

	}

export default App;
