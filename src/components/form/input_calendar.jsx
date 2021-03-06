import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarBtn from './calendar_btn';
import { Calendar } from '../calendar';

const CalendarInput = (props) => {
	const [ showCalendar, setShowCalendar ] = useState(false);

	const {
		name,
		onChange,
		handleCalendar,
		handleUpdateDate,
		value = "",
		label,
		placeHolder,
		mandatory = false,
		helper,
		err = false,
	} = props;

	const mandatoryStr = mandatory && (<span className="text-danger">*</span>);

	return (
		<React.Fragment>
			<div className="form-group">
				<label htmlFor={ name } className={ err ? "text-danger" : null }>
					{ label }
					{ mandatoryStr }
				</label>
				<div className='input-group'>
					<CalendarBtn onclick={ () => { setShowCalendar(!showCalendar) } } />
					<input
						className={ `form-control ${ err && "is-invalid"}` }
						placeholder={ placeHolder || label}
						name={ name }
						value={ value }
						onChange={ typeof onChange === "function" ? onChange : null }
					/>
				</div>
				{
					showCalendar && (
						<Calendar
							onUpdateDate={ (val) => {
								handleUpdateDate(val);
								setShowCalendar(false);
							} }
							onCancel={ () => { setShowCalendar(false); } }
						/>
					)
				}
				<small className={ `form-text ${ err && "text-danger" }`}>{ helper }</small>
			</div>
		</React.Fragment>);
};

CalendarInput.propTypes = {
	name: PropTypes.string, // имя для инпута
	onChange: PropTypes.func, // обработчик события изменения текста в инпуте
	handleUpdateDate: PropTypes.func, // обновить дату через календарь
	value: PropTypes.string, // значение для инпута
	label: PropTypes.string, // это лейбл
	placeHolder: PropTypes.string, // плейсхолдер для инпута
	mandatory: PropTypes.bool, // является ли поле обязательным по умолчанию
	helper: PropTypes.string, // текст подсказка
	err: PropTypes.bool, // флаг - есть ошибка / нет ошибки
};

export default CalendarInput;