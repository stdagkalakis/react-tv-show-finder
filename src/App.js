import React, { Component, Fragment } from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';
import Shows from './components/shows/Shows';
import Show from './components/shows/Show';

// Router for pages
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// axios for http calls.
import axios from 'axios';
import About from './components/pages/About';
import Search from './components/shows/Search';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    loading: false,
    shows: [],
    show: {},
    seasons: [],
    alert: null,
    authStr: 'Bearer ' + process.env.REACT_APP_TVDB_JWT
  };

  // Search shows by text
  searchShows = async text => {
    this.setState({ loading: true });
    const res = await axios
      .get(`/search/series?name=${text}`, {
        headers: { Authorization: this.state.authStr, crossdomain: true }
      })
      .catch(error => {
        console.log('error 3 ' + error);
      });

    this.setState({ shows: res.data.data, loading: false });
  };

  // Clear shows search results
  clearShows = () => {
    this.setState({ shows: [], loading: false });
  };

  // set alert using message and a type to attach from css
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  // Get show details.
  getShow = async id => {
    this.setState({ loading: true });

    const res = await axios
      .get(`/series/${id}`, {
        headers: { Authorization: this.state.authStr, crossdomain: true }
      })
      .catch(error => {
        console.log('error 3 ' + error);
      });

    this.setState({ show: res.data.data, loading: false });
  };

  // Get show seasons.
  getShowSeasons = async id => {
    this.setState({ loading: true });

    const res = await axios
      .get(`/series/${id}/episodes/summary`, {
        headers: { Authorization: this.state.authStr, crossdomain: true }
      })
      .catch(error => {
        console.log('error 3 ' + error);
      });

    this.setState({ seasons: res.data.data, loading: false });
  };

  //=============================================
  // Get image src from server (not working)
  //=============================================
  getSrc = async image => {
    axios
      .get(
        `/banners/${image}`,
        {
          headers: {
            Authorization: 'Bearer ' + process.env.REACT_APP_TVDB_JWT,
            crossdomain: true
          }
        },
        { responseType: 'arraybuffer' }
      )
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        this.setState({ source: 'data:;base64,' + base64 });
      })
      .catch(e => {
        console.log(e);
      });
  };

  //=============================================

  render() {
    const { shows, show, loading, alert, seasons } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/'>
                <Fragment>
                  <Search
                    searchShows={this.searchShows}
                    clearShows={this.clearShows}
                    showClear={shows.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Shows loading={loading} shows={shows} />
                </Fragment>
              </Route>
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/series/:id'
                render={props => (
                  <Show
                    {...props}
                    getShow={this.getShow}
                    getShowSeasons={this.getShowSeasons}
                    show={show}
                    loading={loading}
                    seasons={seasons}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
