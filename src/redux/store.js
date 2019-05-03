import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import getLimitOrders from '../relayBackend/relayApi';
//import { mockLimitOrderList } from '../mockBackend/mockList'

const initialState = {
	drawer: {
		visible: false
	},
    createLimitOrder: {
        visible: false
    },
	limitOrderList: {
		orders: [] 
        //mockLimitOrderList(20, true)
	},
	limitOrderDetails: null
    /*{
		send: {
			abbr: 'ETH',
			amount: 125,
			amountDollar: 10000
		},
		receive: {
			abbr: 'BTC',
			amount: 4,
			amountDollar: 10000
		},
		price: { amount: 28.19512548 },
        collateral: { amount: 1000, currencyAbbr: 'ETH' }
	}*/
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
        case 'CREATE_LIMIT_ORDER_START':
            return {
                ...state,
                createLimitOrder: {
                    visible: true
                }
            }
        case 'CREATE_LIMIT_ORDER_STOP':
            return {
                ...state,
                createLimitOrder: {
                    visible: false
                }
            }
		default:
			return state;

	}
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
