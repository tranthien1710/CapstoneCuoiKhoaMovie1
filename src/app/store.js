import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import reduceBooking from 'feather/booking/redux/reduceBooking';
import reduceLogin from 'feather/login/redux/reduceLogin';
import SliceAdmin from 'feather/admin/redux/SliceAdmin'


const rootReduce = combineReducers({
    booking: reduceBooking,
    user:reduceLogin,
    admin:SliceAdmin,
})

const store = createStore(rootReduce, composeWithDevTools(applyMiddleware(thunk)))


export default store;