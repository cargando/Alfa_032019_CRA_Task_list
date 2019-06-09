import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../card';

export default class MainList extends React.Component {


	render() {

		return (
			<Card>


				{
					this.props.children // компоненты "дети", которые были переданы внутрь <MainList>....</MainList>
				}
			</Card>);

	}
}