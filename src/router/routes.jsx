import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom'; //  , Switch
import * as URL from './url';

import Home from '../scenes/home';
import TaskForm from '../scenes/main';
import TaskDnd from '../scenes/dnd';
import Page404 from '../scenes/404';



export default (
	<Switch>
		<Route exact path={ URL.URL_HOME } component={ Home } />
		<Route exact path={ URL.URL_TASK_FORM } component={ TaskForm } />
		<Route exact path={ URL.URL_TASK_DND } component={ TaskDnd } />

		<Route component={ Page404 } />
	</Switch>);


