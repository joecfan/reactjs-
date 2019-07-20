import React from 'react';

class Player extends React.Component {

    videoPlayerRef = React.createRef();
    muteFlag = false;
    mode = false;

    /* this.videoPlayerRef.current.ontimeupdate = ()=> {
        console.log('timeupdate',this.videoPlayerRef.current);
    } */

    onTimeUpdate() {
        let currentPercent = Math.round(Math.floor(this.videoPlayerRef.current.currentTime) / Math.floor(this.videoPlayerRef.current.duration) * 100);
        if (isNaN(currentPercent)) {
            currentPercent = 0;
        }
        this.props.onTimeUpdate(currentPercent);
    }

    playlistClick = (id, url) => {
        console.log("videoPlayerRef", this.videoPlayerRef);
        this.videoPlayerRef.current.src = url;
        this.videoPlayerRef.current.play();
    }
    
    videoControl = (controlFlag) => {

        if (controlFlag === 'play') {
            this.videoPlayerRef.current.play();
        } else if (controlFlag === 'pause') {
            this.videoPlayerRef.current.pause();
        } else if (controlFlag === 'plus' && this.videoPlayerRef.current.volume > 0 && this.videoPlayerRef.current.volume < 1) {
            this.videoPlayerRef.current.volume += 0.1;
        } else if (controlFlag === 'minus' && this.videoPlayerRef.current.volume >= 0.1 && this.videoPlayerRef.current.volume <= 1) {
            this.videoPlayerRef.current.volume -= 0.1;
        } else if (controlFlag === 'reload') {
            this.videoPlayerRef.current.load();
            this.videoPlayerRef.current.play();
        } else if (controlFlag === 'mute') {
            if (this.muteFlag === false) {
                this.videoPlayerRef.current.muted = true;
                this.muteFlag = true;
            } else {
                this.videoPlayerRef.current.muted = false;
                this.muteFlag = false;
            }
        } 
        
    }

    render() {
        return (
            <div>
                <video id="videoPlayer" ref={this.videoPlayerRef} onTimeUpdate={()=>this.onTimeUpdate()} width="90%" height="80%" controls="controls">
                    <source
                        src="https://video.pearvideo.com/mp4/adshort/20190706/cont-1574279-14096750_adpkg-ad_hd.mp4" />
                </video>
                <input type="hidden" id="videoId" />
            </div>
        );
    }
}

export default Player;