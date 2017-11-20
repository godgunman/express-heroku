const axios = require('axios');
const React = require('react');
const ReactDOM = require('react-dom');

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
}

class HistoryItem extends React.Component {
  render() {
    const { formattedAddress,
      lat, lng, queryAddress } = this.props.item;
    return (
      <div className="item">
        <i className="large map signs middle aligned icon"></i>
        <div className="content">
          <a className="header">{queryAddress}</a>
          <div className="description">({lat},{lng}) {formattedAddress}</div>
        </div>
      </div>
    )
  }
}


class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
  }

  async update() {
    let url = getApiUrl() + '/api/history/';
    let { data } = await axios.get(url);
    this.setState({ data });
  }

  componentDidMount() {
    this.update();
  }

  render() {
    return (
      <div className="ui relaxed divided list">
        {
          this.state.data.map((item, index) => {
            return <HistoryItem item={item} key={index} />
          })
        }
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async search(event) {
    let input = this.state.input;
    let url =
      getApiUrl() + `/api/search?address=${input}`;
    let { data } = await axios.get(url)
    this.history.update();
    console.log(data)
  }

  handleChange(event) {
    let value = event.target.value
    this.setState({ input: value })
  }

  setHistory(history) {
    this.history = history
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="fourteen wide column">
          <h2 id="header" className="ui teal image header">
            <i className="hand spock icon"></i>
            <div className="content">
              Search for food
            </div>
          </h2>
          <div className="ui action input">
            <input type="text"
              onChange={this.handleChange.bind(this)} />
            <button className="ui blue button"
              onClick={this.search.bind(this)}>
              search
            </button>
          </div>
          <div className="ui horizontal divider">
            Places
          </div>
          <History ref={this.setHistory.bind(this)} />
        </div>
      </div>
    )
  }
}

// 將 App 元件載入 root element 裡頭
ReactDOM.render(
  <App />,
  document.getElementById('root')
)