import React from 'react';
import './index.css'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import AddPost from './components/AddPost';
import Post from './components/Post';
import PostsList from './components/PostsList';

// import styled from 'styled-components';


// const Container = styled.div`
//   margin: auto;
//   padding: 40px 40px 60px 40px;
//   width: 90%;
//   background-color: violet;
//   color: white;
//   border-radius: 5px;
//   transition: .2s all ease-out;
//   &:hover{
//     background-color: #90d5fc
//   }
// `

const App = () => {
  return (
    <Router>
      <div className="container">
      <nav>
          <Link to={'/posts'}>
            <div className="navbar_posts">
                Posts
            </div>
          </Link>
          <Link to={'/add'}>
            <div className="navbar_add_post">
                Add post
            </div>
          </Link>
            <a href="https://github.com/wurinz/React-Redux-CRUD" target="_blank">
              <div className="navbar_gihub">
                Check on GithHub
              </div>
            </a>
      </nav>


      


      <Switch>
        <Route exact path={["/", "/posts"]} component={PostsList}/>
        <Route exact path="/add" component={AddPost}/>
        <Route exact path="/posts/:id" component={Post}/>
      </Switch>

      </div>

    </Router>
  );
}

export default App;
