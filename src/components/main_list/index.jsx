import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../card';
import {MainTab} from "../../scenes/main";
import Modal from "../modals/simple_modal";
import ViewTaskModal from "../task/view_task_modal";

export default class MainList extends React.Component {

	static propTypes = {
		data: PropTypes.array, // список задач длдя рендера
		onTaskEdit: PropTypes.func,
		onTaskDelete: PropTypes.func,
	};

	static defaultTypes = {
		data: [],
	};

	constructor(props) {
		super(props);
		this.state = {
			modalFlag: false,
			taskId: null,
		}
		console.log("MainList =", this.props)
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
		this.props.onTaskEdit(e, taskId);
	};

	handleDeleteTask = (e) => {
		e.persist();  // конвертировать событие реакт (Syntetic Event) в нормальное событие ДОМ (Event)
		const { target } = e;
		const taskId = target.parentElement.getAttribute("data-id");
		this.props.onTaskDelete(e, taskId);
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

		const list = this.props.data && this.props.data.length
			? this.props.data.map(this.renderOneTask)
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
