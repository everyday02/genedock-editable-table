import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// import Demo01 from './src/Demo01';
import Demo02 from './src/Demo02';
import Demo03 from './src/Demo03';

class App extends Component {
  render() {
    return (
      <div>
        {/*<Demo01 />*/}
        <Demo02 />
        <Demo03 />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
