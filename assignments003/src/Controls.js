import React from 'react';

class Controls extends React.Component {

    constructor(props) {
        super(props);
        console.log("Controls",this.props.currentVideoId);
        var vlike = localStorage.getItem(this.props.currentVideoId);
        if (vlike == null) {
            vlike = {"like": 0, "unlike": 0};
        } else {
            vlike = JSON.parse(vlike);
        }
        
        this.state = {cursor: '', vlike: vlike};
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        
        if (this.props.currentVideoId !== nextProps.currentVideoId) {
            var vlike = localStorage.getItem(nextProps.currentVideoId);
            if (vlike == null) {
                vlike = {"like": 0, "unlike": 0};
            } else {
                vlike = JSON.parse(vlike);
            }
            this.setState({vlike: vlike});
            console.log("vlike",this.state.vlike);
        }
    }

    videoControl(controlFlag) {

        this.setState({cursor: controlFlag});
        this.props.player.current.videoControl(controlFlag);

        let vlike = this.state.vlike;
        if (controlFlag === 'up') {
            vlike.like = vlike.like + 1;
            localStorage.setItem(this.props.currentVideoId, JSON.stringify(vlike));

        } else if (controlFlag === 'down') {
            vlike.unlike = vlike.unlike + 1;
            localStorage.setItem(this.props.currentVideoId, JSON.stringify(vlike));
        } 
    }
    render() {
        return (
            <div>
                <div>
                    <font size="10">
                        <i className="glyphicon glyphicon-play" id="play" style={{cursor: this.state.cursor==='play'?'':'pointer'}} onClick={() => { this.videoControl('play') }}
                        ></i>
                        <i className="glyphicon glyphicon-pause" id="pause" style={{cursor: this.state.cursor==='pause'?'':'pointer'}} onClick={() => {this.videoControl('pause')}}
                        ></i>
                        <i className="glyphicon glyphicon-plus" id="plus" style={{cursor:'pointer'}} onClick={() => {this.videoControl('plus')}}
                        ></i>
                        <i className="glyphicon glyphicon-minus" id="minus" style={{cursor:'pointer'}} onClick={() => {this.videoControl('minus')}}
                        ></i>
                        <i className="glyphicon glyphicon-refresh" id="refresh" style={{cursor:'pointer'}} onClick={() => {this.videoControl('reload')}}
                        ></i>
                        <i className="glyphicon glyphicon-headphones" id="mute" style={{cursor:'pointer'}} onClick={() => {this.videoControl('mute')}}
                        ></i>
                        <i className="glyphicon glyphicon-thumbs-up" id="up" onClick={() => {this.videoControl('up')}}
                            style={{ color: 'green',cursor:'pointer' }}><span id="up">{this.state.vlike.like}</span></i>
                        <i className="glyphicon glyphicon-thumbs-down" id="down" onClick={() => {this.videoControl('down')}}
                            style={{ color: 'red',cursor:'pointer' }}><span id="down">{this.state.vlike.unlike}</span></i>
                    </font>
                </div>
                <div>
                    <progress id="progressBar" ref="progressBarRef" value={this.props.progressValue} max="100" style={{ width: '100%' }}></progress>
                </div>
            </div>
        );
    }
}

export default Controls;