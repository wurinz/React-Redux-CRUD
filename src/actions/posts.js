import {
    CREATE_POST,
    RETRIEVE_POSTS,
    UPDATE_POST,
    DELETE_POST,
    DELETE_ALL_POSTS
} from './types'

import axios from '../services/PostService';

export const createPost = (title, body) => async (dispatch) => {
    try {
        const res = await axios.create({ title, body });
        dispatch({
            type: CREATE_POST,
            payload: res.data
        })

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const retrievePosts = () => async (dispatch) => {
    try {
        const res = await axios.getAll();
        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, data) => async (dispatch) => {
    try{
        const res = await axios.update(id, data);
        dispatch({
            type: UPDATE_POST,
            payload: data
        })
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await axios.remove(id);
        dispatch({
            type: DELETE_POST,
            payload: {id}
        })
    } catch (error) {
        console.log(error);
    }
};

export const deleteAllPosts = () => async (dispatch) => {
    console.log("DELETE ALL")
    try{
        const res = await axios.removeAll();
        dispatch({
            type: DELETE_ALL_POSTS,
            payload: res.data
        })
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}


export const findPostByTitle = (title) => async (dispatch) => {
    try{
        const res = await axios.findByPostTitle(title);
        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}


