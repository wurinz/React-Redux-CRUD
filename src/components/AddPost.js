import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/posts'

const AddPost = () => {

    const initialPostState = {
        id: null,
        title: '',
        body: '', 
        comments: [],
        published: false
    };

    const [ post, setPost ] = useState(initialPostState);
    const [ submitted, setSubmitted ] = useState(false); 

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPost({...post, [name]: value})
    };

    const savePost = () => {
        const { title, body, comments } = post;

        dispatch(createPost(title, body, comments))
            .then(data => {
                setPost({
                    id: data.id,
                    title: data.title,
                    body: data.body,
                    comments: comments,
                    published: data.published
                });
                setSubmitted(true);

                console.log(data);
            }).catch(error => console.log(error));
    };

    const newPost = () => {
        setPost(initialPostState);
        setSubmitted(false);
    }


    return(
        <div className="add_container">
            <h1>ADD POST</h1>
            { submitted ? (
            <div>
                <h4 className="success_message">You submitted successfully!</h4>
                <button className="add_button" onClick={newPost}>Add More</button>
            </div>
            ) : (
                <div className="add_form">
                    <div className="form_group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            className="form"
                            id="title"
                            required
                            value={post.title}
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="body">Body</label>
                        <textarea 
                            type="text"
                            className="body_input"
                            id="body"
                            required
                            placeholder="Tell us something"
                            value={post.body}
                            onChange={handleInputChange}
                            name="body"
                        />
                    </div>
                    <button
                        onClick={savePost}
                        className="add_button"
                    >Submit</button>
                </div>
            )}            
        </div>
    );
};


export default AddPost;