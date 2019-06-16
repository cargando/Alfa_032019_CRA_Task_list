

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ViewTaskModal from '../components/task/view_task_modal';
import * as appActions from '../store/action_creators';
import * as URL from '../router/url';


class TasksViewOne extends React.PureComponent {

	static propTypes = {
		taskList: PropTypes.array,
		children: PropTypes.object, //
	};

	componentDidMount() {
		if (this.props.taskList && this.props.taskList.length) {
			return null;
		}
		let taskList = [];
		try {
			taskList = JSON.parse(localStorage.getItem('TASKS'));
		} catch (e) {
			console.log('Couldn\'t init JSON from Local Storage: ', e.message);
		}
		this.props.updateTask({taskList})

		const { code: indexId } = this.props.match.params;
		console.log("this.props.history", this.props.history);
		if (!taskList[indexId]) {
			this.props.history.push('/404');
		}

	}

	render() {

		const { code: indexId, superId } = this.props.match.params;
		const content = this.props.taskList ? this.props.taskList[indexId] : null;
		if (!content) {
			this.props.history.replace('sdfsdfkjh ');
		}
		return (
			<React.Fragment>
				<div className='row'>
					<div className='col-md-12'>
						<br />
						<h3>Просмотр задачи { superId }</h3>
						<br />
						{
							content ? (<ViewTaskModal data={ content } />) :
								(<h2>Не удалось обнаружить задачу с номером { indexId}</h2>)
						}
					</div>
				</div>
				<div className="row">
					<div className='col-md-12'><br />
						<Link
							to={ URL.URL_TASK_FORM }
							className='btn btn-outline-dark'
						>
							<i className='fas fa-angle-left' /> &nbsp;
							список задач
						</Link>
					</div>

				</div>
			</React.Fragment>
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
	};
};


const connected = connect(mapStateToProps, mapDispatchToProps)(TasksViewOne);

export default withRouter(connected);