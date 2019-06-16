

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router';
import ViewTaskModal from '../components/task/view_task_modal';
import * as appActions from '../store/action_creators';
import * as ACT from '../store/actions';
import * as URL from '../router/url';



const TasksViewOne = (props) => {

		const { code: indexId } = props.match.params;
		const taskList = useSelector(store => store.app.taskList);
		const dispatch = useDispatch();
		const content = taskList ? taskList[indexId] : null;

		useEffect(() => {
			if (!taskList.length) {
				dispatch({
					type: ACT.DATA_TASK_UPDATE,
					payload: appActions.loadTaskList(),
				});
			}
			document.title = `Просмотр задачи № ${ indexId }`;
		}, []);

		return (
			<React.Fragment>
				<div className='row'>
					<div className='col-md-12'>
						<br />
						<h3>Просмотр задачи { indexId }</h3>
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
			</React.Fragment>)
};

TasksViewOne.propTypes = {
	taskList: PropTypes.array,
	children: PropTypes.object, //
};


export default withRouter(TasksViewOne);