import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import 'moment/locale/ru';
import './calendar.css';
import { CalendarBody } from "./body";

export class Calendar extends Component {
	static propTypes = {
		calendarDate: PropTypes.object, // объект момент, т.е. дата которой оперирует календарь
		onCancel: PropTypes.func, // метод добавления напоминания  в список
		onUpdateDate: PropTypes.func, // метод обновления даты
	};

	constructor(props, context) {
		super(props, context);
		moment.locale('ru');

		this.state = {
			calendarDate: moment(),
			calendarChosen: null,
		}
	}

	handleRightClick = () => {
		this.handleClickCalendarArrows('right');
	};

	handleLeftClick = () => {
		this.handleClickCalendarArrows('left');
	};

	handleClickCalendarArrows = (arrow) => {

		this.setState((prevState) => ({
				calendarDate: (arrow === 'right') ? moment(prevState.calendarDate,'DD-MM-YYYY').add('month', 1)
					: moment(prevState.calendarDate,'DD-MM-YYYY').subtract('month', 1),
			}));
	};

	/* метод замены выбранной даты и отображаемого месяца в календаре */
	handleClickDate = (newDateToOperate, choosen = false) => {
		const stateObj = { calendarDate: newDateToOperate };
		if (choosen) {
			stateObj.calendarChosen = newDateToOperate;
		}
		this.setState({ ...stateObj });
	};

	handleChooseDate = () => {
		this.props.onUpdateDate(this.state.calendarDate)
	};

		render() { // , top: '38px'
		// console.log('CALENDAR PROPS = ', this.props);
			return (
				<div id='calendar' className='micalendar' style={ { display: 'block' } }>
					<div className='header_wrap'>
						<div className='header'>
							<p id='monthHeader'>{ this.state.calendarDate.format('MMMM YYYY') }</p>
						</div>
						<div className='arrows'>
							<div onClick={ this.handleLeftClick } className='arrows_left'>
								<i className='fa fa-angle-left' />
							</div>
							<div  onClick={ this.handleRightClick } className='arrows_right'>
								<i className='fa fa-angle-right' />
							</div>
						</div>
					</div>
					<table id='calendar_table'>
						<thead>
						<tr>
							<th>Пн</th>
							<th>Вт</th>
							<th>Ср</th>
							<th>Чт</th>
							<th>Пт</th>
							<th>Сб</th>
							<th>Вс</th>
						</tr>
						</thead>
						<tbody>
						<CalendarBody
							calendarDate={ this.state.calendarDate }
							calendarChosen={ this.state.calendarChosen }
							onClickDate={ this.handleClickDate }
							onDblClickDate={ this.handleChooseDate }

						/>
						</tbody>
					</table>
					<hr />
						<div className='btn-group'>
							<input
								type='button'
								onClick={ this.handleChooseDate }
								value='Вставить'
				        className='btn btn-sm btn-outline-primary'
							/>
						</div>
						<div className='btn-group'>
							<input
								type='button'
								onClick={ this.props.onCancel }
								value='Закрыть'
				        className='btn btn-sm btn-outline-secondary'
							/>
						</div>
				</div>);
		}
	}