const axios = require('axios');
const React = require('react');
const ReactDOM = require('react-dom');

const getApiUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
}

class PlaceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.update()
  }

  async update() {
    let url = getApiUrl() + '/history/'
    let { data } = await axios.get(url)
    this.setState({ data })
  }

  render() {
    return (
      <div>
        {
          this.state.data.map((item) => {
            return (
              <li>{item.address},
                {item.result.formatted_address},
                {item.result.lat},
                {item.result.lng}</li>
            )
          })
        }
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