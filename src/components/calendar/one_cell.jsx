import React from 'react';

const CalendarCell = (props) => {
	const {
		className = null,
		dataFullDate = null,
		dataDayMonth = null,
		cellText = null,
		onClickCell: handleClickCell,
		onDblClickCell: handleDblClickCell,
	} = props;

	if (!className && !dataFullDate && !dataDayMonth ) {
		return <td> &nbsp; </td>;
	}
	return (<td
		onClick={ handleClickCell }
		onDoubleClick={ handleDblClickCell }
		className={ className }
	>
		{ cellText === null ? dataDayMonth : cellText }
	</td>);
};

export default React.memo(CalendarCell);