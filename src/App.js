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
		// this.handleDeleteTask = this.handleDeleteTask.bind(this);
	}

	componentDidMount() {
		let taskList = [];
		try {
			taskList = JSON.parse(localStorage.getItem("TASKS"));
		} catch (e) {
			console.log("Couldn't init JSON from Local Storage: ", e.message);
		}
		this.setState({ taskList })

		// document.addEventListener("keydown", this.handleDeleteTask);
	}


	handleEditTask = (e, taskId) => {
		console.log("this is from App, id = ", taskId);
		const { taskList } = this.state;
		this.setState({
			taskId,
			taskForEdit: taskList[taskId],
			formSate: FORM_EDIT,
		});
	};

	handleDeleteTask(e, taskId) {
		console.log("this is DELETE from App, id = ", taskId);
		const { taskList } = this.state;
		taskList.splice(taskId, 1);
		this.setState({
			taskList,
		});
	}

	handleSaveFormData = (data) => {
		const { taskList } = this.state;
		if (this.state.formSate === FORM_ADD) {
			taskList.push(data);
		} else {
			taskList[(this.state.taskId)] = { ...data };
		}
		this.setState({
			taskList,
			taskId: null,
			taskForEdit: null,
			formSate: FORM_ADD,
		});

		localStorage.setItem("TASKS", JSON.stringify(taskList));

		return true;
	};

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
						onTaskDelete={ this.handleDeleteTask.bind(this) }
						onTaskEdit={ this.handleEditTask }
						onSaveData={ this.handleSaveFormData }
					/>

				</div>
			</React.Fragment>
		);

	}

	}

export default App;
