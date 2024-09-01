import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_FILE_LIST, ADD_FILE, DELETE_FILE, TOGGLE_FILE, GET_ERRORS } from '../actions/types.jsx';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

// Get todo list
export const getFiles = () => dispatch => {
    axios.get('api/file/')
        .then(result => {
            dispatch({
                type: GET_FILE_LIST,
                payload: result.data
            });
        }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

//Delete todo
export const deleteFiles = (id) => dispatch => {
    axios.delete(`api/file/${id}/`)
        .then(result => {
            dispatch(createMessage({fileDeleted: "Todo deleted!"}));
            dispatch({
                type: DELETE_FILE,
                payload: id
            });
        }).catch(error => console.log(error));
};

//Toggle todo
export const toggleTodo = (file) => dispatch => {
    todo.done = !todo.file;
    axios.put(`api/file/${file.id}/`, file)
        .then(result => {
            dispatch({
                type: TOGGLE_FILE,
                payload: result.data
            });
        }).catch(error => console.log(error));
};

//Add todo
export const addFiles = (file) => dispatch => {
    axios.post('api/file/', file)
        .then(result => {
            dispatch(createMessage({todoAdded: "Todo added!"}));
            dispatch({
                type: ADD_FILE,
                payload: result.data
            });
        }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};