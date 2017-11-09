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

  async getHistory() {
    let url = getApiUrl() + '/api/history/';
    let { data } = await axios.get(url);
    console.log(data);
    return data;
  }

  componentDidMount() {
    this.getHistory();
  }

  render() {
    // let result = (await this.getHistory())[0];
    return <div>Hello {this.props.name}</div>;
  }
}

// 將 hello 元件載入 root element 裡頭
ReactDOM.render(
  <History />,
  document.getElementById('root')
)