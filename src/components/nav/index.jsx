import React from 'react';
import PropTypes from 'prop-types'

const renderNavItem = (item) => {
	const {
		title,
		onClick,
		isActive = false,
	} = item;

	return (
		<a
			onClick={ onClick }
			className={ `nav-item nav-link ${ isActive ? "active" : "" }` }
		>
			{ title }
		</a>
	)
};

const Navigation = (props) => {
	const { items = [] } = props;

	return (
		<nav>
			<div className="nav nav-tabs">
				{
					items.map(renderNavItem)
				}
			</div>
		</nav>);
};

Navigation.propTypes = {
	items: PropTypes.array,
};

Navigation.defaulTypes = {
	items: [],
};

export default React.memo(Navigation);