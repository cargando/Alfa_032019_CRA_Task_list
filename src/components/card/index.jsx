import React from 'react';
import PropTypes from 'prop-types';

export const Card = (props) => {
	const { children } = props;

	return (<div className="card">
		<div className="card-body">
			{
				children // компоненты-дети, которые были переданы "внутрь" <Card>....</Card>
			}
		</div>
	</div>);
}
