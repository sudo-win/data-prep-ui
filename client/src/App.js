import logo from './logo.svg';
import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

const [data, setData] = React.useState(null);

React.useEffect(() => {
    fetch("/users")
      .then((res) => res.text())
      .then((data) => setData(data));
  }, []);


  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header> */}
              {/* <div>
            
            <button onClick={onClickHandler}>
                Send a file
            </button>
            <div>
                <h3>Response from server</h3>
            </div>
        </div> */}

        {/* <form action="/fileUpload" enctype="multipart/form-data" method="POST"> 
        <input type="file" name="myFile" />
        <input type="submit" value="Upload a file"/>
      </form> */}

      <label class="form-label" for="customFile">Default file input example</label>
      <input type="file" class="form-control" id="customFile" />

    </div>
  );

}

export default App;
