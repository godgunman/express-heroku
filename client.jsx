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
    return <li> <b>{queryAddress}</b>({lat},{lng}) <br /> {formattedAddress}</li>
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
      <ul>
        {
          this.state.data.map((item, index) => {
            return <HistoryItem item={item} key={index} />
          })
        }
      </ul>
    );
  }
}

class App extends React.Component {

  async search() {
    let url =
      getApiUrl() + '/api/search?address=總統府';
    let { data } = await axios.get(url)
    console.log(data)
  }

  render() {
    return (
      <div>
        <input type="text" />
        <button onClick={this.search}> search </button>
        <History />
      </div>
    )
  }
}

// 將 hello 元件載入 root element 裡頭
ReactDOM.render(
  <App />,
  document.getElementById('root')
)