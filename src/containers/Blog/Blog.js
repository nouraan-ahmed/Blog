import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from '../../axios';

class Blog extends Component {

    state = {
        posts:[],
        selected:null,
        error:false
    }

    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4); 
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author:'max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log(updatedPosts)
                })
                .catch(error => {
                    this.setState({error:true});
                });
                
    }

    postSelected = (id) => {
        this.setState({selected:id});
    }

    render () {
        
        let posts = <p style={{textAlign: 'center'}}>Something went Wrong</p>;
        if(!this.state.error){
        posts = this.state.posts.map(
            post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={()=>this.postSelected(post.id)}/>;
            }
        );
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selected}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;