import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom'; //  , Switch
import * as URL from './url';

import Home from '../scenes/home';
// import TaskForm from '../scenes/main';
// import TaskDnd from '../scenes/dnd';
// import Page404 from '../scenes/404';
// import TasksViewOne from '../scenes/view_one_task';

const TaskForm = lazy(() => import('../scenes/main'));
const TaskDnd = lazy(() => import('../scenes/dnd'));
const TasksViewOne = lazy(() => import('../scenes/view_one_task_hooks'));
const Page404 = lazy(() => import('../scenes/404'));


export default (
	<Switch>
		<Route exact path={ URL.URL_HOME } component={ Home } />
		<Route exact path={ URL.URL_TASK_FORM } component={ TaskForm } />
		<Route exact path={ URL.URL_TASK_DND } component={ TaskDnd } />
		<Route exact path={ URL.URL_TASK_VIEW_ONE } component={ TasksViewOne } />

		<Route component={ Page404 } />
	</Switch>);


