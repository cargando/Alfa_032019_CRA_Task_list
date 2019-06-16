import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DndColumn from '../components/dnd/column';
import DndItem from '../components/dnd/dnd_item';
import { TODO, IN_PROGRESS, DONE } from '../lib/const';
import * as appActions from "../store/action_creators";
import {withRouter} from "react-router";


class TaskDnd extends React.Component {
	static propTypes = {
		taskList: PropTypes.array, //
		children: PropTypes.object, //
		loadTaskList: PropTypes.func, //
		updateTask: PropTypes.func, //
	};

	constructor(props) {
		super(props);
		this.columns = [
			{
				id: TODO,
				title: 'To Do',
				color: 'blue',
				ref: React.createRef(),
			}, {
				id: IN_PROGRESS,
				title: 'In Progress',
				color: 'orange',
				ref: React.createRef(),
			}, {
				id: DONE,
				title: 'Done',
				color: 'green',
				ref: React.createRef(),
			},
		]
	}

	componentDidMount() {
		this.props.updateTask(this.props.loadTaskList());
	}

	renderColumnChildren = (status) => {
		if (!this.props.taskList || !this.props.taskList.length) {
			return null;
		}
		return this.props.taskList.map( (item, index) => {

			return status.toLocaleUpperCase() === item.taskStatus.toLocaleUpperCase() ? (
				<DndItem
					key={ `${ status }_${ index }` }
					{ ...item }
				/>
			) : null;
		});
	};

	renderColumn = (item, index) => {
		return (
			<DndColumn
				key={ item.id }
				title={ item.title }
				ref={ item.ref }
				color={ item.color }
			>
				{
					this.renderColumnChildren(item.id)
				}
			</DndColumn>);
	};

	render() {
		return (
			<div className='row'>
				<div className='col-md-12'>
					<h2>Task status</h2>
				</div>

				{
					this.columns.map(this.renderColumn)
				}
			</div>
		)
	};
}


const mapStateToProps = (state) => {
	return {
		taskList: state.app.taskList,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateTask: payload => dispatch(appActions.updateTask(payload)),
		loadTaskList: payload => appActions.loadTaskList(payload),
	};
};


const connected = connect(mapStateToProps, mapDispatchToProps)(TaskDnd);

export default withRouter(connected);
