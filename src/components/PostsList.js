import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link}  from 'react-router-dom';

import { 
    retrievePosts,
    findPostByTitle,
    deleteAllPosts
} from '../actions/posts';

const PostsList = () => {

    const [ currentPost, setCurrentPost ] = useState(null);
    const [ currentIndex, setCurrentIndex ] = useState(-1);
    const [ searchTitle, setSearchTitle ] = useState('');

    const posts = useSelector(state => state.Posts);
    console.log(posts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrievePosts());
    }, [])

    const onChangeSearhTitle = event => {
        const searchTitle = event.target.value;
        setSearchTitle(setSearchTitle);
    }

    const refreshData = () => {
        setCurrentPost(null);
        setCurrentIndex(-1);
    }

    const setActivePost = (post, index) => {
        console.log(index)
        setCurrentPost(post);
        setCurrentIndex(index);
    }

    const removeAllPosts = () => {
        dispatch(deleteAllPosts())
            .then(response => {
                console.log(response);
                refreshData();
            })
            .catch(event => {
                console.log(event);
            })
    }

    const findByTitle = () => {
        refreshData();
        dispatch(findPostByTitle(searchTitle));
    }

    return(
        <div className="posts_container">
            {/* <div className="search_container">
                <input 
                    type="text"
                    className="search_input"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={onChangeSearhTitle}
                />
                <button
                    className="search_button"
                    onClick={findPostByTitle}
                >Search</button>
            </div> */}
            <div className="list_container">
                <h1>Posts List</h1>
                <div className="posts_container">
                    { posts && posts.map((post, index) => {
                        return <div 
                            className="post"
                            onClick={() => setActivePost(post, index)}
                            onMouseEnter={()=> setActivePost(post, index)}
                            key={index}
                        >
                            <div className="post_header">
                                <h4>Title: {post.title}</h4>
                                <Link className="post_read_more" to={`/posts/${currentPost?.id}`}>Read more...</Link>
                            </div>
                            <p className="post_body">{post.body}</p>
                        </div>

                    }) }
                </div>
            </div>
        </div>
    )
}

export default PostsList;