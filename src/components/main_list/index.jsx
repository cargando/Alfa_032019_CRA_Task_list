import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../card';
import {MainTab} from "../../scenes/main";

export default class MainList extends React.Component {

	static propTypes = {
		data: PropTypes.array, // список задач длдя рендера
	};

	static defaultTypes = {
		data: [],
	};

	handleViewTask = (e) => {

	};

	handleEditTask = (e) => {

	};

	handleDeleteTask = (e) => {

	};

	renderOneTask = (item) => {

		return (
			<li class="list-group-item" style={ { position: "relative" } }>
				{
					item.taskUrgent && (<i class="text-danger fa fa-exclamation-triangle" />)
				}
				<a
					href="#"
					onClick={ this.handleViewTask }
					data-id={ item.id }
				>
					{ item.taskName }
				</a>
				<br />
				<span class="text-muted">
					<small>
						{ item.taskDate }
			    </small>
				</span>

				<span
					data-id={ item.id }
					className="delete_ico"
					onClick={ this.handleDeleteTask }
				>
					<i className="fa fa-times"/>
				</span>
				<span
					data-id={ item.id }
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
			</Card>);

	}
}
