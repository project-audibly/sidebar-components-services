import React from 'react';
import axios from 'axios';
import RelatedSongsList from './RelatedSongsList.jsx';
import RelatedPlaylistsList from './RelatedPlaylistsList.jsx';
import TotalLikes from './TotalLikes.jsx';
import TotalReposts from './TotalReposts.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainSong: [],
      mainSongLikes: 0,
      mainSongReposts: 0,
      relatedSongs: [],
      relatedPlaylists: [],
      recentUserLikes: [],
      recentUserReposts: []
    };

    this.getMainSong = this.getMainSong.bind(this);
  }

  getMainSong() {
    return axios.get('/api/mainSong')
      .then(res => {
        console.log('RES DATA FROM GET ALL SONGS GET REQUEST FROM CLIENT SIDE ', res.data);
        this.setState({
          mainSong: res.data,
          mainSongLikes: res.data.likes,
          mainSongReposts: res.data.reposts,
          relatedSongs: res.data.related_songs,
          relatedPlaylists: res.data.related_playlists,
          recentUserLikes: res.data.recent_user_likes,
          recentUserReposts: res.data.recent_user_reposts
        })
      })
      .catch((err) => {
        console.log('get err so many errs on client side ', err);
      })
  }

  componentDidMount() {
    this.getMainSong();
  }

  render() {
    return (
      <div>
        <div className="sidebarContent">
          <div>
            <RelatedSongsList relatedSongs={this.state.relatedSongs} />
          </div>
          <div>
            <RelatedPlaylistsList relatedPlaylists={this.state.relatedPlaylists} />
          </div>
          <div>
            <TotalLikes total={this.state.mainSongLikes} recentUserLikes={this.state.recentUserLikes} />
          </div>
          <div>
            <TotalReposts total={this.state.mainSongReposts} recentUserReposts={this.state.recentUserReposts} />
          </div>
        </div>
      </div>
    )
  }

}

export default App;


// getTest () {
//     axios.get('/test')
//         .then(res => {
//             console.log('get test res ', res);
//         })
//         .catch(err => console.log('get test err ', err))
// }