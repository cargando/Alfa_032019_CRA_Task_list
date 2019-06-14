import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appActions from '../../store/action_creators';
import { Card } from '../card';
import {MainTab} from "../../scenes/main";
import Modal from "../modals/simple_modal";
import ViewTaskModal from "../task/view_task_modal";

class MainList extends React.Component {

	static propTypes = {
		data: PropTypes.array, // список задач длдя рендера
		taskList: PropTypes.array, // список задач длдя рендера
		onTaskEdit: PropTypes.func,
		onTaskDelete: PropTypes.func,
		updateTask: PropTypes.func, // из Redux
		deleteTask: PropTypes.func, // из Redux
		editTask: PropTypes.func, // из Redux
	};

	// static defaultTypes = {
	// 	data: [],
	// };

	constructor(props) {
		super(props);
		this.state = {
			modalFlag: false,
			taskId: null,
		}
		console.log("MainList =", this.props)
	}

	componentDidMount() {
		let taskList = [];
		try {
			taskList = JSON.parse(localStorage.getItem("TASKS"));
		} catch (e) {
			console.log("Couldn't init JSON from Local Storage: ", e.message);
		}
		// this.setState({ taskList })
		this.props.updateTask({taskList})

	}

	handleCloseModal = () => {
		this.setState({
			modalFlag: false,
			taskId: null,
		})
	};

	handleViewTask = (e) => {
		const { target } = e;
		const taskId = target.getAttribute("data-id");

		this.setState({
			taskId,
			modalFlag: true,
		})
	};

	handleEditTask = (e) => {
		e.persist();  // конвертировать событие реакт (Syntetic Event) в нормальное событие ДОМ (Event)
		const { target } = e;
		const taskId = target.parentElement.getAttribute("data-id");
		// this.props.onTaskEdit(e, taskId);
		this.props.editTask({taskId});

	};

	handleDeleteTask = (e) => {
		e.persist();  // конвертировать событие реакт (Syntetic Event) в нормальное событие ДОМ (Event)
		const { target } = e;
		const taskId = target.parentElement.getAttribute("data-id");
		// this.props.onTaskDelete(e, taskId);
		this.props.deleteTask({
			taskList: this.props.taskList,
			deleteId: taskId,
		});
	};

	renderOneTask = (item, index) => {

		return (
			<li key={ index } className="list-group-item" style={ { position: "relative" } }>
				{
					item.taskUrgent && (<React.Fragment>
						<i className="text-danger fa fa-exclamation-triangle" />
						&nbsp;
						</React.Fragment>)
				}
				<a
					href="#"
					onClick={ this.handleViewTask }
					data-id={ index }
				>
					{ item.taskName }
				</a>
				<br />
				<span className="text-muted">
					<small>
						{ item.taskDate }
			    </small>
				</span>

				<span
					data-id={ index }
					className="delete_ico"
					onClick={ this.handleDeleteTask }
				>
					<i className="fa fa-times"/>
				</span>
				<span
					data-id={ index }
					className="edit_ico"
					onClick={ this.handleEditTask }
				>
					<i className="fas fa-edit"/>
				</span>

				</li>

		)
	};


	render() {
		const emptyList = (
			<li className="list-group-item">
				<span className="text-secondary">Список задач пуст</span>
			</li>);

		const list = this.props.taskList && this.props.taskList.length
			? this.props.taskList.map(this.renderOneTask)
			: emptyList;

		return (
			<Card>
				<h4>Список всех задач</h4>
				<ul className="list-group">
					{
						list
					}
				</ul>

				{
					this.props.children // компоненты "дети", которые были переданы внутрь <MainList>....</MainList>
				}
				<Modal
					title="Some title"
					onCancelClick={ this.handleCloseModal }
					display={ this.state.modalFlag }
				>
					<ViewTaskModal
						data={ this.props.data ? this.props.data[(this.state.taskId)] : null }
					/>
				</Modal>
			</Card>);

	}
}

const mapStateToProps = (store) => {
		return {
			taskList: store.app.taskList.slice(), //
		};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateTask: payload => dispatch(appActions.updateTask(payload)),
		deleteTask: payload => dispatch(appActions.deleteTask(payload)),
		editTask: payload => dispatch(appActions.editTask(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainList);