import React from 'react';
import PropTypes from 'prop-types'



const Page404 = (props) => {

	return (
		<div className="row">
			<div className="col-md-12">
				<h1>404</h1>
				<h2>Sorry, page not found</h2>
				{
					props.children
				}
			</div>
		</div>
	)
};

Page404.propTypes = {
	children: PropTypes.object, //
};

export default React.memo(Page404);