import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../card';
import { TextInput, Select, TextArea, CheckBox } from '../form';
import { TASK_OPTIONS } from "../../lib/const";

export default class MainForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: {},
			err: {},
		}
	}

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

	render() {

		return (
			<Card>
				<h4>Add new task</h4>
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
			</Card>);

	}
}