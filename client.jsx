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
    
    return <li> <b>{queryAddress}</b> ({lat},
    {lng}) <br /> {formattedAddress}</li>
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
    return this.state.data.map((item) => {
      return <HistoryItem item={item}/>
    })
  }
}

// 將 hello 元件載入 root element 裡頭
ReactDOM.render(
  <History />,
  document.getElementById('root')
)