import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { NAV_ITEMS, NAV_MAIN } from '../../lib/nav_data';


const renderNavItem = (item) => {
	const {
		title,
		isActive = false,
		name,
		url,
	} = item;

	return (
		<Link
			to={ url }
			role="button"
			key={ name }
			className={ `nav-item nav-link ${ isActive ? "active" : "" }` }
		>
			{ title }
		</Link>
	)
};

const Navigation = (props) => {
	console.log("NAV = ", props)
	return (
		<nav>
			<div className="nav nav-tabs">
				{
					NAV_ITEMS.map(renderNavItem)
				}
			</div>
		</nav>);
};


export default React.memo(withRouter(Navigation));