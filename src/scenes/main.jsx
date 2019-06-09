import React from 'react';
import PropTypes from 'prop-types';
import MainForm from '../components/main_form';
import MainList from '../components/main_list';

export const MainTab = (props) => {

	return (
		<div className="row">
			<div className="col-sm-6">
				<MainForm
					taskForEdit={ props.taskForEdit }
					formSate={ props.formSate }
				>
					<p>This is children from Main Tab</p>
				</MainForm>
			</div>
			<div className="col-sm-6">
				<MainList
					data={ props.taskList }
					onTaskEdit={ props.onTaskEdit }
					onTaskDelete={ props.onTaskDelete }
				/>
			</div>
		</div>
	);
};

MainTab.propTypes = {
	taskList: PropTypes.array, // список задач
	onTaskEdit: PropTypes.func, // редактировать таску
	onTaskDelete: PropTypes.func, // удалить таску
	formSate: PropTypes.string, // состояние формы (редактровать или добавить таску)
	taskForEdit: PropTypes.object, // номер таски, которую редактируют
};