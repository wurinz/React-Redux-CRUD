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
        <a href="https://github.com/wurinz">Watch on GithHub</a>
        <div className="navbar">
          <div className="navbr_item">
            <Link to={'/posts'}>
              Posts
            </Link>
          </div>
          <div>
            <Link to={'/add'}>
              Add
            </Link>
          </div>
        </div>
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
