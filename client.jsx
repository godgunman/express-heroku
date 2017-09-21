const axios = require('axios');
const React = require('react');
const ReactDOM = require('react-dom');

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
}

const getHistory = async () => {
  let url = getApiUrl() + '/history/';
  let result = await axios.get(url);
  console.log(result)
}

getHistory()

class PlaceList extends React.Component {
  render() {
    return (
      <div>
        <li>查詢的名稱, 地址, 經緯度</li>
        <li>查詢的名稱, 地址, 經緯度</li>
      </div>
    )
  }
}
class App extends React.Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="search...">
        </input>
        <button>
          search
        </button>
        <PlaceList />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)