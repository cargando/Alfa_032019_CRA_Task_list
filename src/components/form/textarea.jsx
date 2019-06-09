import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
	const {
		name,
		onChange,
		value = "",
		label,
		placeHolder,
		mandatory = false,
		helper,
		err = false,
		rows = null,
		cols = null,
	} = props;

	const mandatoryStr = mandatory && (<span className="text-danger">*</span>);
	const colsRows = {};
	if (rows !== null) {
		colsRows.rows = rows;
	}
	if (cols !== null) {
		colsRows.cols = cols;
	}
	return (
		<div className="form-group">
			<label
				htmlFor={ name }
        className={ err ? "text-danger" : null }
			>
				{ label }
				{ mandatoryStr }
			</label>
			<textarea
				className="form-control"
				onChange={ onChange }
				name={ name }
				placeholder={ placeHolder || label}
				defaultValue={ value }
				{ ...colsRows }
			/>
			<small className={ `form-text ${ err && "text-danger" }`}>{ helper }</small>
		</div>);
};

TextArea.propTypes = {
	name: PropTypes.string, // имя для инпута
	onChange: PropTypes.func, // обработчик события изменения текста в инпуте
	value: PropTypes.string, // значение для инпута
	label: PropTypes.string, // это лейбл
	placeHolder: PropTypes.string, // плейсхолдер для инпута
	mandatory: PropTypes.bool, // является ли поле обязательным по умолчанию
	helper: PropTypes.string, // текст подсказка
	err: PropTypes.bool, // флаг - есть ошибка / нет ошибки
	rows: PropTypes.number, // кол-во рядов в текс ареа
	cols: PropTypes.number, // кол-во строк в текс ареа
};

export default TextArea;