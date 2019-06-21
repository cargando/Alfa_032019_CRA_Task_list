import React from 'react';
import PropTypes from 'prop-types';


const DndColumn = (props, ref) => {

	return (
		<div className='col-sm-4'>
			<div ref={ ref } data-name={ props.name } className='card'>
				<div className='card-body card-body-dnd'>
					<h3>{ props.title }</h3>
					<hr color={ props.color} />
						<ul className='list-group'>
							{
								props.children
							}
						</ul>
				</div>
			</div>
		</div>);
};

DndColumn.propTypes = {
	title: PropTypes.string,
	name: PropTypes.string, // TODO, IN_PROGRESS, DONE
	children: PropTypes.object,
	color: PropTypes.string,
};

export default React.forwardRef(DndColumn)