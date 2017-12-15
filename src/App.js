import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

import { fileBrowserApi } from "./services/fileBrowserApi";
import { FileContentList } from "./components/FileContentList";
import { FileContentPagination } from "./components/FileContentPagination";

class App extends Component {
  state = {
    file: {
      fileName: "",
      page: 1,
      totalPage: 0,
      content: null,
      error: null
    }
  };
  handleChange = event => {
    const fileName = event.target.value;
    this.setState(prevState => {
      return { file: { ...prevState.file, fileName } };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.resetStateOnSearch();
    this.getFileData();
  };

  resetStateOnSearch() {
    this.setState(prevState => {
      return {
        file: {
          ...prevState.file,
          page: 1,
          totalPage: 0,
          content: null,
          error: null
        }
      };
    });
  }

  setPage(page) {
    return new Promise(resolve => {
      this.setState(prevState => {
        return {
          file: {
            ...prevState.file,
            page
          }
        };
      }, resolve);
    });
  }

  onPaginate = page => {
    this.setPage(page).then(() => {
      this.getFileData();
    });
  };

  async getFileData() {
    const { fileName, page } = this.state.file;
    const params = { fileName, page };
    try {
      const response = await fileBrowserApi(params);
      let { content, totalPage, page } = response;
      page = parseInt(page, 10); // cause api response has type string
      this.setState(prevState => {
        return {
          file: { ...prevState.file, page, totalPage, content, error: null }
        };
      });
    } catch (response) {
      let { message } = response;
      message = message || `Failed to fetch file data`;
      this.setState(prevState => {
        return {
          file: {
            ...prevState.file,
            page: 1,
            totalPage: 0,
            content: null,
            error: message
          }
        };
      });
    }
  }
  render() {
    const { error } = this.state.file;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">File content viewer</h1>
        </header>
        <p className="App-intro" />
        <span>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="filename">
                Enter file name to browse its content:
              </label>
            </p>

            <input
              name="filename"
              type="text"
              placeholder="file name"
              autoComplete="on"
              value={this.state.file.fileName}
              onChange={this.handleChange}
            />
            <input type="submit" value="View" />
            <p />
            <span style={{ color: "darkred" }}> {error ? error : ""}</span>
          </form>

          <p />
          <div>
            <FileContentList {...this.state.file} />
          </div>
          <p> </p>
          <div>
            <FileContentPagination
              {...this.state.file}
              onPaginate={this.onPaginate}
            />
          </div>
        </span>
      </div>
    );
  }
}

export default App;
