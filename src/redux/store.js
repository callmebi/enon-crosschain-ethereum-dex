import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {
	drawer: {
		visible: true
	},
	limitOrderList: {
		orders: []
	}
}

function rootReducer(state = initialState, action) {
	console.log(action)

	switch (action.type) {
		case 'OPEN_DRAWER':
			return {
				...state,
				drawer: {
					...state.drawer,
					visible: true
				}
			}
		case 'CLOSE_DRAWER':
			return {
				...state,
				drawer: {
					...state.drawer,
					visible: false
				}
			}
		case 'SET_LIMIT_ORDERS':
			return {
				...state,
				drawer: {
					...state.drawer,
					visible: false
				},
				limitOrderList: {
					...state.limitOrderList,
					orders: action.payload
				}
			}
		default:
			return state;

	}
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));