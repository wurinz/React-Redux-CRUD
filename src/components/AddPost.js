import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/posts'

const AddPost = () => {

    const initialPostState = {
        id: null,
        title: '',
        body: '', 
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
        const { title, body } = post;

        dispatch(createPost(title, body))
            .then(data => {
                setPost({
                    id: data.id,
                    title: data.title,
                    body: data.body,
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
        <div className="submit_form">
            { submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="add_button" onClick={newPost}>Add</button>
            </div>
            ) : (
                <div>
                    <div className="fourm_group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={post.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>
                    <div className="fourm_group">
                        <label htmlFor="body">Body</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="body"
                            required
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