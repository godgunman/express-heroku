const axios = require('axios');
const React = require('react');
const ReactDOM = require('react-dom');

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
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
    console.log('[render]', this.state);

    return this.state.data.map((item) => {
      const { formattedAddress, lat, lng, queryAddress } = item;
      return <li> {queryAddress}, {lat}, {lng}</li>
    })
  }
}

// 將 hello 元件載入 root element 裡頭
ReactDOM.render(
  <History />,
  document.getElementById('root')
)