import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/nav';
import { NAV_ITEMS, NAV_MAIN } from './lib/nav_data';



class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeNavItem: NAV_MAIN
		}

	}

	navHelper = () => {
		return NAV_ITEMS.map((item) => {
			item.onClick = this.handleNavClick;
			if (this.state.activeNavItem === item.name ) {
				item.isActive = true;
			}
			return item;
		});
	};

	render() {

		return (
			<React.Fragment>
				<div className="container">

					<h1>CRA Task List</h1>
					<Navigation items={} />

				</div>
			</React.Fragment>
		);

	}

	}

export default App;
