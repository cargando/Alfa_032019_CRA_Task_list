import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import DndColumn from '../components/dnd/column';
import DndItem from '../components/dnd/dnd_item';
import { TODO, IN_PROGRESS, DONE } from '../lib/const';
import * as appActions from "../store/action_creators";
import {withRouter} from "react-router";


class TaskDnd extends React.Component {
	static propTypes = {
		taskList: PropTypes.array, //
		children: PropTypes.object, //
		loadTaskList: PropTypes.func, //
		updateTask: PropTypes.func, //
	};

	constructor(props) {
		super(props);

		this.columns = [
			{
				id: TODO,
				title: 'To Do',
				color: 'blue',
				ref: React.createRef(),
			}, {
				id: IN_PROGRESS,
				title: 'In Progress',
				color: 'orange',
				ref: React.createRef(),
			}, {
				id: DONE,
				title: 'Done',
				color: 'green',
				ref: React.createRef(),
			},
		];
		this.transferTaskID = null;
		this.state = {
			from: null,
			id: null,
		}
	}

	componentDidMount() {
		this.props.updateTask(this.props.loadTaskList());
		this.mountEventListeners();
	}

	getItemRef = (id) => {
		let resVal = null;
		this.columns.forEach(item => {

			if (id === item.id) {
				resVal = item.ref.current;
			}
		});
		return resVal;
	};

	mountEventListeners = () => {
		this.columns.forEach(item => {
			const { current: card } = item.ref;
			card.addEventListener("dragstart", this.handleDragStartTask); // назначить события "начало перемещения"
			// card.addEventListener("dragenter", handleDragEnter); // назначить события "вход в зону"
			card.addEventListener("dragleave", this.handleDragLeave); // назначить события "выход из зоны"
			card.addEventListener("dragover", this.handleDragOver); // назначить события "перемещение над зоной"
			card.addEventListener("drop", this.handleDrop); // назначить события "перемещение над зоной"
		});
	};

	renderColumnChildren = (status) => {
		if (!this.props.taskList || !this.props.taskList.length) {
			return null;
		}
		console.log("STATUS", status)
		if (!status) return null;
		return this.props.taskList.map( (item, index) => {
			return status.toLocaleUpperCase() === item.taskStatus.toLocaleUpperCase() ? (
				<DndItem
					key={ `${ status }_${ index }` }
					{ ...item }
					id={ index }
				/>
			) : null;
		});
	};


	handleDragStartTask = (e) => {
		const optionTarget = e.target;
		const optionDataId = optionTarget.querySelector('a').getAttribute("data-id");
		const parent = optionTarget.parentElement.parentElement.parentElement;
		const parentId = parent.getAttribute("data-name");

		const todoListCard = this.getItemRef(TODO); // document.getElementById("todoListCard");
		const inprogressListCard = this.getItemRef(IN_PROGRESS); // document.getElementById("inprogressListCard");
		const doneListCard = this.getItemRef(DONE); // document.getElementById("doneListCard");

		if(parentId.includes(TODO)) {
			todoListCard.classList.add("inactive-dnd");
			inprogressListCard.classList.add("active-dnd");
			doneListCard.classList.add("active-dnd");
			this.setState({ from: TODO});

		} else if(parentId.includes(IN_PROGRESS)) {
			inprogressListCard.classList.add("inactive-dnd");
			todoListCard.classList.add("active-dnd");
			doneListCard.classList.add("active-dnd");
			this.setState({ from: IN_PROGRESS});

		} else if(parentId.includes(DONE)) {
			doneListCard.classList.add("inactive-dnd");
			todoListCard.classList.add("active-dnd");
			inprogressListCard.classList.add("active-dnd");
			this.setState({ from: DONE});
		}
		e.dataTransfer.setData("text/plain", optionDataId);
		this.setState({ id: optionDataId});
	};

	handleDrop = (e) => { // обработчик события - объект "бросили/отпустили" в зону, куда можно сделать drop
		e.preventDefault();
		const cardContainer = e.currentTarget.getAttribute("data-name");
		const taskList = cloneDeep(this.props.taskList);

		const optionDataId = e.dataTransfer.getData("text");
		if (optionDataId === null) {
			Error("Shit on me: this.transferTaskID = NULL");
		}

		if(cardContainer.includes(TODO) && taskList[optionDataId].taskStatus !== TODO) {
			taskList[optionDataId].taskStatus = TODO;
			this.props.updateTask({taskList});

		} else if(cardContainer.includes(IN_PROGRESS) && taskList[optionDataId].taskStatus !== IN_PROGRESS) {
			taskList[optionDataId].taskStatus = IN_PROGRESS;
			this.props.updateTask({taskList});

		} else if(cardContainer.includes(DONE) && taskList[optionDataId].taskStatus !== DONE) {
			taskList[optionDataId].taskStatus = DONE;
			this.props.updateTask({taskList});
		}
		this.handleResetCardBlock();
	};

	handleResetCardBlock = (e) => { // убирает пунктирную-рамку вокруг блока "карточки"
		e && e.stopPropagation();

		const todoListCard = this.getItemRef(TODO); // document.getElementById("todoListCard");
		const inprogressListCard = this.getItemRef(IN_PROGRESS); // document.getElementById("inprogressListCard");
		const doneListCard = this.getItemRef(DONE); // document.getElementById("doneListCard");

		todoListCard.classList.remove("active-dnd", "inactive-dnd", "card-body-dnd-accept", "card-body-dnd-decline");
		inprogressListCard.classList.remove("active-dnd", "inactive-dnd", "card-body-dnd-accept", "card-body-dnd-decline");
		doneListCard.classList.remove("active-dnd", "inactive-dnd", "card-body-dnd-accept", "card-body-dnd-decline");

		todoListCard.querySelector(".card-body").classList.remove("card-body-dnd-accept", "card-body-dnd-decline");
		inprogressListCard.querySelector(".card-body").classList.remove("card-body-dnd-accept", "card-body-dnd-decline");
		doneListCard.querySelector(".card-body").classList.remove("card-body-dnd-accept", "card-body-dnd-decline");
	};

	handleDragLeave = (e) => { // обработчик события - перетаскиваемый элемент "ушел" из зоны, куда можно было сделать drop
		var cardContainer = e.currentTarget;

		var cardBody = cardContainer.querySelector(".card-body");
		cardBody.classList.remove("card-body-dnd-accept", "card-body-dnd-decline");
	};

	handleDragOver = (e) => { // обработчик события - перетаскиваемый элемент перемещается над областью, куда можно сделать drop
		e.preventDefault();
		const cardContainer = e.currentTarget;
		const cardName = cardContainer.getAttribute("data-name");
		const cardBody = cardContainer.querySelector(".card-body");

		if( (cardName.includes(TODO) && this.state.from === TODO) ||
			(cardName.includes(IN_PROGRESS)  && this.state.from === IN_PROGRESS) ||
			(cardName.includes(DONE)  && this.state.from === DONE)) {
			cardBody.classList.add("card-body-dnd-decline");
		} else {
			cardBody.classList.add("card-body-dnd-accept");
		}
		return null;
	};


	render() {
		return (
			<div className='row'>
				<div className='col-md-12'>
					<h2>Task status</h2>
				</div>

				{
					this.columns.map((item, index) => {
						console.log("RND = ", item)
						return (
							<DndColumn
								key={ item.id }
								title={ item.title }
								ref={ item.ref }
								color={ item.color }
								name={ item.id }
							>
								{
									this.renderColumnChildren(item.id)
								}
							</DndColumn>)
					})
				}
			</div>
		)
	};
}


const mapStateToProps = (state) => {
	return {
		taskList: state.app.taskList,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateTask: payload => dispatch(appActions.updateTask(payload)),
		loadTaskList: payload => appActions.loadTaskList(payload),
	};
};


const connected = connect(mapStateToProps, mapDispatchToProps)(TaskDnd);

export default withRouter(connected);
