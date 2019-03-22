import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { mockLimitOrderList } from '../mockBackend/mockList'

const initialState = {
	drawer: {
		visible: false
	},
	limitOrderList: {
		orders: mockLimitOrderList(20, true)
	},
	limitOrderDetails: {
		order: {
			send: {
				abbr: 'ETH',
				amount: 125,
				amountDollar: 10000
			},
			receive: {
				abbr: 'BTC',
				amount: 4,
				amountDollar: 10000
			}
		},
		price: { amount: 28.19512548 }
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
		case 'SET_LIMIT_ORDER_DETAILS':
			return {
				...state,
				limitOrderDetails: action.payload
			}
		default:
			return state;

	}
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));