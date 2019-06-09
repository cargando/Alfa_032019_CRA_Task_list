import React from 'react';
import PropTypes from 'prop-types'

const renderNavItem = (item) => {
	const {
		title,
		onClick,
		isActive = false,
		name,
	} = item;

	return (
		<a
			role="button"
			key={ name }
			onClick={ onClick }
			className={ `nav-item nav-link ${ isActive ? "active" : "" }` }
			data-name={ name }
			style={ { cursor: "pointer" } }
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