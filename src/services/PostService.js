import axios from '../api'

const getAll = () => {
    return axios.get('/posts');
};

const get = id => {
    return axios.get(`/posts/${id}`);
};

const create = data => {
    return axios.post("/posts", data);
};

const update = (id, data) => {
    return axios.put(`/posts/${id}`, data);
};

const remove = id => {
    return axios.delete(`/posts/${id}`)
};
const removeAll = () => {
    return axios.delete('/posts/');
};

const findPostByTitle = title => {
    return axios.get(`/posts?title=${title}`);
};

const PostService = {
    getAll,
    get, 
    create, 
    update,
    remove,
    removeAll,
    findPostByTitle
}

export default PostService;