import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = (props) => {
	const {
		name,
		onChange,
		label,
		checked = false,
		mandatory = false,
		helper,
		err = false,
	} = props;

	const mandatoryStr = mandatory && (<span className="text-danger">*</span>);

	return (
		<div className="form-group form-check">
			<input
				type="checkbox"
				className={ `form-control ${ err && "is-invalid"}` }
				name={ name }
				checked={ checked }
				onChange={ typeof onChange === "function" ? onChange : null }
			/>
			<label htmlFor={ name } className={ `form-check-label ${ err ? "text-danger" : "" }` }>
				<i className="fas fa-exclamation-triangle" style={ {color: "#ff0000"} } />
				{ label }
				{ mandatoryStr }
			</label>
			<small className={ `form-text ${ err && "text-danger" }`}>{ helper }</small>
		</div>);
};

CheckBox.propTypes = {
	name: PropTypes.string, // имя для чекбокса
	onChange: PropTypes.func, // обработчик события изменения текста в чекбоксе
	checked: PropTypes.bool, // галочка отмечена или нет
	label: PropTypes.string, // это лейбл
	mandatory: PropTypes.bool, // является ли поле обязательным по умолчанию
	helper: PropTypes.string, // текст подсказка
	err: PropTypes.bool, // флаг - есть ошибка / нет ошибки
};

export default CheckBox;