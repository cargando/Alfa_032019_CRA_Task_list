import React from 'react';
import './App.css';
import Navigation from './components/nav';
import { NAV_ITEMS, NAV_MAIN } from './lib/nav_data';
import { FORM_ADD, FORM_EDIT } from './lib/const';
import { MainTab } from './scenes/main';
import "./calendar.css";

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activeNavItem: NAV_MAIN,
			taskList: [],
			taskId: null,
			taskForEdit: null,
			formSate: FORM_ADD, // ["add", "edit"]
		}

	}

	handleEditTask = (e, taskId) => {
		console.log("this is from App, id = ", taskId);
		const { taskList } = this.state;
		this.setState({
			taskForEdit: taskList[taskId],
			formSate: FORM_EDIT,
		});
	};

	handleDeleteTask(e, taskId) {
		console.log("this is DELETE from App, id = ", taskId);
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
						taskForEdit={ this.state.taskForEdit }
						formSate={ this.state.formSate }
						taskList={ this.state.taskList }
						onTaskDelete={ this.handleDeleteTask }
						onTaskEdit={ this.handleEditTask }
					/>

				</div>
			</React.Fragment>
		);

	}

	}

export default App;
