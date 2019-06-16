import React from 'react';
import PropTypes from 'prop-types'
import {MainTab} from "./main";


const TaskDnd = (props) => {

	return (
		<div className="row">
			<div className="col-md-12">
				<h2>Task statuses</h2>
				{
					props.children
				}
			</div>
		</div>
	)
};

TaskDnd.propTypes = {
	children: PropTypes.object, //
};

export default React.memo(TaskDnd);