import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '../card';
import { TextInput, Select, TextArea, CheckBox } from '../form';
import { TASK_OPTIONS, FORM_ADD, FORM_EDIT } from "../../lib/const";
import * as appActions from "../../store/action_creators";

class MainForm extends React.Component {

	static propTypes = {
		formSate: PropTypes.string, // состояние формы (редактровать или добавить таску) из Redux
		taskForEdit: PropTypes.any, // номер таски, которую редактируют из Redux
		taskList: PropTypes.array, // из Redux
		addTask: PropTypes.func, // из Redux
		saveTask: PropTypes.func, // из Redux
		resetForm: PropTypes.func, // из Redux
	};


	constructor(props) {
		super(props);

		this.state = {
			data: {},
			err: {},
			propsFlag: false,
		}
	}

	static getDerivedStateFromProps(nextProps, state) {
		if (!state.propsFlag && nextProps.taskForEdit !== null && nextProps.taskList.length) {
			return {
				data: nextProps.taskList[nextProps.taskForEdit],
				propsFlag: true,
			}
		}
		return null;
	};

	handleChange = (event) => {
		const { target } = event;
		const { name } = target;

		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState((prevState) => ({
			data: {
				...prevState.data,
				[name]: value,
			}
		}));
	};

	handleSaveData = (e) => {
		if (this.props.formSate === FORM_ADD) {
			this.props.addTask({
				taskList: this.props.taskList,
				data: this.state.data,
		});
		} else {
			this.props.saveTask({
				taskList: this.props.taskList,
				data: this.state.data,
				id: this.props.taskForEdit,
			});
		}
		this.handleResetData();
	};

	handleResetData = () => {
		this.props.resetForm();
		this.setState({
			data: {},
			propsFlag: false,
		});
	};

	render() {

		return (
			<Card>
				<h4>
					{
						this.props.formSate === FORM_ADD
							? "Add new task"
							: `Edit task ${ this.props.taskForEdit || "" }`
					}</h4>
				<TextInput
					value={ this.state.data.taskName || "" }
					name="taskName"
					onChange={ this.handleChange }
					label="Task name"
					helper={ this.state.err.taskName || "Введите название вашей задачи" }
					err={ !!this.state.err.taskName }
					mandatory
				/>
				<TextArea
					value={ this.state.data.taskDescription || "" }
					name="taskDescription"
					onChange={ this.handleChange }
					label="Task Description"
					helper={ this.state.err.taskDescription || "Введите описание задачи" }
					err={ !!this.state.err.taskDescription }
					rows={ 4 }
				/>

				<Select
					value={ this.state.data.taskStatus || "" }
					options={ TASK_OPTIONS }
					name="taskStatus"
					onChange={ this.handleChange }
					label="Task name"
					helper={ this.state.err.taskStatus || "Выберите статус задачи" }
					err={ !!this.state.err.taskStatus }
				/>

				<CheckBox
					name="taskUrgent"
					onChange={ this.handleChange }
					label="Task urgency"
					checked={ this.state.data.taskUrgent  || false }
					helper={ this.state.err.taskUrgent || "Укажите важность для задачи" }
					err={ !!this.state.err.taskUrgent }
				/>

				{
					this.props.children // компоненты "дети", которые были переданы внутрь <MainForm>....</MainForm>
				}
				<div className="row">
					<div className="col-sm-6">
						<button
							id="actionButton"
							onClick={ this.handleSaveData }
							type="button"
							className="btn btn-primary"
						>
							{
								this.props.formSate === FORM_ADD ? "Add new task" : "Save changes"
							}
						</button>
					</div>
					<div className="col-sm-6">
						<button
							id="cancelButton"
							onClick={ this.handleResetData }
							type="button"
							className="btn btn-secondary"
						>
							{
								this.props.formSate === FORM_ADD ? "Clear form" : "Cancel"
							}
						</button>
					</div>
				</div>
			</Card>);

	}
}


const mapStateToProps = (store) => {
	return {
		taskList: store.app.taskList.slice(), //
		taskForEdit: store.app.taskForEdit, //
		formSate: store.app.formSate, //
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTask: payload => dispatch(appActions.addTask(payload)),
		saveTask: payload => dispatch(appActions.saveTask(payload)),
		resetForm: payload => dispatch(appActions.resetForm(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);