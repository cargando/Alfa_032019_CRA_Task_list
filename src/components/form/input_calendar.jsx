import React from 'react';
import PropTypes from 'prop-types';
import CalendarBtn from './calendar_btn'

const CalendarInput = (props) => {
	const {
		name,
		onChange,
		handleCalendar,
		value = "",
		label,
		placeHolder,
		mandatory = false,
		helper,
		err = false,
	} = props;

	const mandatoryStr = mandatory && (<span className="text-danger">*</span>);

	return (
		<div className="form-group">
			<label htmlFor={ name } className={ err ? "text-danger" : null }>
				{ label }
				{ mandatoryStr }
			</label>
			<div className='input-group'>
				<CalendarBtn onclick={ handleCalendar } />
				<input
					className={ `form-control ${ err && "is-invalid"}` }
					placeholder={ placeHolder || label}
					name={ name }
					value={ value }
					onChange={ typeof onChange === "function" ? onChange : null }
				/>
			</div>
			<small className={ `form-text ${ err && "text-danger" }`}>{ helper }</small>
		</div>);
};

CalendarInput.propTypes = {
	name: PropTypes.string, // имя для инпута
	onChange: PropTypes.func, // обработчик события изменения текста в инпуте
	value: PropTypes.string, // значение для инпута
	label: PropTypes.string, // это лейбл
	placeHolder: PropTypes.string, // плейсхолдер для инпута
	mandatory: PropTypes.bool, // является ли поле обязательным по умолчанию
	helper: PropTypes.string, // текст подсказка
	err: PropTypes.bool, // флаг - есть ошибка / нет ошибки
};

export default CalendarInput;