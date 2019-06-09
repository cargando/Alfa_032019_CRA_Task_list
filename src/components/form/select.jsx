import React from 'react';
import PropTypes from 'prop-types';

const renderSelectOptions = (item) => {
	let value = null;
	let title = null;

	if (typeof item === "object") {
		value = item.value;
		title = item.title;
	} else {
		value = title = String(item);
	}
	return (<option key={ value } value={ value }>
		{
			title
		}
	</option>);
};

const Select = (props) => {
	const {
		name,
		onChange,
		options,
		value = "", // default value
		label,
		placeHolder,
		mandatory = false,
		helper,
		err = false,
	} = props;

	const mandatoryStr = mandatory && (<span className="text-danger">*</span>);
	console.log("SELECT ", value)
	return (
		<div className="form-group">
			<label htmlFor={ name } className={ err ? "text-danger" : null }>
				{ label }
				{ mandatoryStr }
			</label>

			<select
				onChange={ onChange }
				className="form-control"
				name={ name }
				placeholder={ placeHolder || label}
				value={ value.toLocaleUpperCase() }
			>
				{
					options.map(renderSelectOptions)
				}
			</select>
			<small className={ `form-text ${ err && "text-danger" }`}>{ helper }</small>
		</div>);
};

Select.propTypes = {
	name: PropTypes.string, // имя для инпута
	onChange: PropTypes.func, // обработчик события изменения текста в инпуте
	value: PropTypes.string, // значение для select по умолчанию
	options: PropTypes.array, // опции для селекта
	label: PropTypes.string, // это лейбл
	placeHolder: PropTypes.string, // плейсхолдер для инпута
	mandatory: PropTypes.bool, // является ли поле обязательным по умолчанию
	helper: PropTypes.string, // текст подсказка
	err: PropTypes.bool, // флаг - есть ошибка / нет ошибки
};

export default Select;