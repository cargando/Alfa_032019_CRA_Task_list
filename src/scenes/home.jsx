import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

export const Home = (props) => {

	return (
		<div className="row">
			<div className="col-sm-6">
				<h2>This is HOME</h2>
				<br />
				<h4>Choose route:</h4>
				<button onClick={ () => { props.history.replace('kjshdkfjshkdfjhsd ')}}>заменить урл</button>
				<button onClick={ () => { props.history.push('task-list')}}>task-list</button>
				{
					props.children
				}
			</div>
		</div>
	);
};

Home.propTypes = {
	children: PropTypes.object, //
};

export default React.memo(withRouter(Home));