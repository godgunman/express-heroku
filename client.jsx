const axios = require('axios');
const React = require('react');
const ReactDOM = require('react-dom');

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
}

const getHistory = async () => {
  let url = getApiUrl() + '/api/history/';
  let { data } = await axios.get(url);
  console.log('data: ', data)
}

class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

// 將 hello 元件載入 root element 裡頭
ReactDOM.render(
  <Hello name="ggm" />,
  document.getElementById('root')
)