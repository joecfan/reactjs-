import React from 'react';
import 'whatwg-fetch';
import 'es6-promise';
//import getPlaylist from './Service';

class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          playlist: [],
          title: "",
          url: ""
        };
    }

    UNSAFE_componentWillMount() {

    console.log('UNSAFE_componentWillMount', this.props);
    this.getPlaylist();
    
    }

    getPlaylist() {
        var result = fetch('http://localhost:3000/playlist',{
            method:'GET',
            headers:{
              'Content-Type':'application/json;charset=UTF-8'
            },
            mode:'cors',
            cache:'default'
          });
        
          result.then(res => {
    
              res.json().then(data => {
                console.log("data:", data);
                if (data != null) {
                    this.setState({playlist: data});
                    for (let play of data) {
                        console.log("play:", play);
                    }
                }
            });
          });
    }

    componentDidMount() {

    }

    playlistClick(play) {
        this.props.player.current.playlistClick(play.id, play.URL);
        this.props.playlistClick(play.id);
    }

    addVideo() {
        let count = this.state.playlist.length;
        let postData = {"id": count+1, "Title": this.state.title, "URL": this.state.url};
        var result = fetch('http://localhost:3000/playlist/',{
            method:'POST',
            headers:{
              'Content-Type':'application/json;charset=UTF-8'
            },
            mode:'cors',
            cache:'default',
            body: JSON.stringify(postData)
          });
        
          result.then(res => {
              res.json().then(data => {
                console.log("data:", data);
                if (data != null) {
                    this.getPlaylist();
                }
            });
          });
        console.log(this.state.url);
    }

    inputChangeHandler(e) {
        
        console.log("inputChangeHandler", e.target);
        
        if (e.target.id === 'title') {
            
            this.setState({"title": e.target.value});
        } else if (e.target.id === 'url') {
            this.setState({"url": e.target.value});
        }
        
    }
    playlistDelete(play) {
        var result = fetch('http://localhost:3000/playlist/'+play.id,{
            method:'DELETE',
            headers:{
              'Content-Type':'application/json;charset=UTF-8'
            },
            mode:'cors',
            cache:'default'
          });
        
          result.then(res => {
    
              res.json().then(data => {
                console.log("data:", data);
                if (data != null) {
                    this.getPlaylist();
                }
            });
          });
    }

    render() {
        var playlistHtml = [];
        
        for (let play of this.state.playlist) {
            playlistHtml.push(<li key={play.id}><a href="javascript:void(0)" onClick={()=>this.playlistClick(play)}> {play.Title}</a>&nbsp;&nbsp;<a href="javascript:void(0)" onClick={()=>this.playlistDelete(play)} style={{color:'blueviolet'}}>Delete</a></li>);
        }

        return (
            <div>
                <div>
                    <label>Title:</label><input type="input" id="title" onChange={this.inputChangeHandler.bind(this)} defaultValue={this.state.title}/>
                    <label>URL:</label><input type="input" id="url" onChange={this.inputChangeHandler.bind(this)} defaultValue={this.state.url}/>&nbsp;&nbsp;
                    <input type="submit" value="Add Video" onClick={()=>{this.addVideo()}} />
                </div>
                <ul id="playList">
                    {playlistHtml}
                </ul>
            </div>
        );
    }
}

export default Playlist;