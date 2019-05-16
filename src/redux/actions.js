//import { mockLimitOrderList } from '../mockBackend/mockList';
// import { getLimitOrderDetails as getLimitOrderById } from '../mockBackend/mockOrder';
import { limitOrderList } from '../relayBackend/relayApi';
// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))
export function getLimitOrders(currAbbr, ipfs, web3) {
    console.log(web3);
	// Thunk middleware knows how to handle functions.
	// It passes the dispatch method as an argument to the function,
	// thus making it able to dispatch actions itself.
    /*
	let per_page = 10;
	switch (currAbbr) {
		case 'ETH':
			per_page = 7;
			break;
		case 'BTC':
			per_page = 3;
			break;
		default:
			break;
	}
    */

	return function (dispatch) {
		// First dispatch: the app state is updated to inform
		// that the API call is starting.
		/**@todo dispatch(requestPosts(subreddit)) */
		// dispatch(requestPosts(subreddit))

		// The function called by the thunk middleware can return a value,
		// that is passed on as the return value of the dispatch method.

		// In this case, we return a promise to wait for.
		// This is not required by thunk middleware, but it is convenient for us.

		return limitOrderList(ipfs, web3)
			.then(limitOrders =>
				// We can dispatch many times!
				// Here, we update the app state with the results of the API call.

				dispatch({
					type: 'SET_LIMIT_ORDERS',
					payload: limitOrders
				})
			)
	}
}

export function getLimitOrderDetails(order) {

	return function (dispatch) {

		return dispatch({
            type: 'SET_LIMIT_ORDER_DETAILS',
            payload: order
        })
	}
}
