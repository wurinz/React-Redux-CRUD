import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost, deletePost } from '../actions/posts'
import axios from '../services/PostService'
const Post = (props) => {
    const initialPostState = {
        id: null, 
        title: "",
        description: "",
        published: false
    }

    console.log(props)
    const [ currentPost, setCurrentPost ] = useState(initialPostState);
    const [ message, setMessage ] = useState("");

    const dispatch = useDispatch();

    const getPost = id => {
        axios.get(id)
        .then(response => {
            setCurrentPost(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getPost(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPost({...currentPost, [name]: value});
    };

    const updateStatus = status => {
        const data = {
            id: currentPost.id,
            title: currentPost.title,
            body: currentPost.body,
            published: status
        }

    dispatch(updatePost(currentPost.id, data))
        .then(response => {
            console.log(response);
            setCurrentPost({...currentPost, published: status});
            setMessage("Updated successfully!");
        }).catch(error => {
            console.log(error);
        });
    };

    const updateContent = () => {
        dispatch(updatePost(currentPost.id, currentPost))
            .then(response => {
                props.history.push('/posts');
            }).catch(error => console.log(error));
    }

    const removePost = () => {
        dispatch(deletePost(currentPost.id)).then(() => {
            props.history.push('/posts');
        }).catch(error => {
            console.log(error);
        });
    };


    return(
        <div>
            {currentPost ? (
                <div className="post_container">
                    <h1>Post</h1>
                    <div className="update_form">
                        <div className="form_group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text"
                                className="form_control"
                                id="post_title"
                                name="title"
                                value={currentPost.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label htmlFor="body">Body</label>
                            <textarea 
                                type="text"
                                className="form_control"
                                id="post_body"
                                name="body"
                                value={currentPost.body}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button
                        className="delete_button"                    
                        onClick={removePost}
                    >Delete Post</button>
                    <button
                        className="update_button"
                        onClick={updateContent}
                    >Update</button>
                </div>
            ) : (<p>
                Choose post
            </p>)}
        </div>
    )
}

export default Post;