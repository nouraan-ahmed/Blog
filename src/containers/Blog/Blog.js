import React, { Component } from 'react';
import Posts from '../Blog/Posts/Posts';
//import NewPost from './NewPost/NewPost';
//import FullPost from '../Blog/FullPost/FullPost';
import './Blog.css';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import asyncComponent from '../../hoc/AsyncComponent';

const asyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component {

    state={
        auth:true
    }

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts/" 
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f',
                                    textDecoration:'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search:'?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <Posts/>} /> */}

                {/* switch to make sure to load one route at a time and ordering routes is important */}
                <Switch>

                {this.state.auth?<Route path='/new-post' component={asyncNewPost}/>:null}
                <Route path='/posts' component={Posts}/>
                <Redirect from="/" exact to="/posts" /> 
                <Route render={()=> <h1>404</h1>} />
                {/* <Redirect from="/" to="/posts" /> */}

                </Switch>
            </div>
        );
    }
}

export default Blog;