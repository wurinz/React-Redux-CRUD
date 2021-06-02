import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost, deletePost } from '../actions/posts'
import axios from '../services/PostService'


const Post = (props) => {
    const initialPostState = {
        id: null, 
        title: "",
        description: "",
        comments: [],
        published: false
    }

    const [ currentPost, setCurrentPost ] = useState(initialPostState);

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
        if(name === "comment"){
            currentPost.comments?.push(value);
            
        }
        setCurrentPost({...currentPost, [name]: value});
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
            <div className="comments_container">
                <textarea 
                    onChange={handleInputChange}
                    type="text"
                    name="comment"
                    className="comment_input"
                />
                <button 
                    className="add_comment_button"
                    onClick={updateContent}
                >Add comment</button>
                <div className="comments">
                    <h2>Comments</h2>
                    { console.log(currentPost.comments) }
                    { currentPost.comments?.map(comment => {
                        return <div className="comment">
                            <p className="comment_header">Comment</p>
                            <p className="comments_text">{comment}</p>
                        </div>
                    }) }
                    {/* <div className="comment">
                        <p className="comment_header">Comment</p>
                        {currentPost.comment}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Post;