import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/nav';
import { NAV_ITEMS, NAV_MAIN } from './lib/nav_data';
import { MainTab } from './scenes/main';
import "./calendar.css";

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeNavItem: NAV_MAIN
		}

	}

	componentDidMount() {
		let taskList = [];
		try {
			taskList = JSON.parse(localStorage.getItem("TASKS"));
		} catch (e) {
			console.log("Couldn't init JSON from Local Storage: ", e.message);
		}
		this.setState({ taskList })
	}

	navHelper = () => {
		return NAV_ITEMS.map((item) => {
			item.onClick = this.handleNavClick;
			item.isActive = false;
			if (this.state.activeNavItem === item.name ) {
				item.isActive = true;
			}
			return item;
		});
	};

	handleNavClick = (event) => {
		const { target } = event;
		const newItem = target.getAttribute("data-name");

		this.setState({activeNavItem: newItem});
	};

	render() {

		return (
			<React.Fragment>
				<div className="container">

					<h1>CRA Task List</h1>
					<Navigation items={ this.navHelper() } />
					<br />
					<MainTab
						taskList={ this.state.taskList }
					/>

				</div>
			</React.Fragment>
		);

	}

	}

export default App;
