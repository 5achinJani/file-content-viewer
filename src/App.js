import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

import { Container, Row, Col } from "reactstrap";

import { fileBrowserApi } from "./services/fileBrowserApi";
import { FileContentList } from "./components/FileContentList";
import { FileContentPagination } from "./components/FileContentPagination";
import { FileSearchBar } from "./components/FileSearchBar";

class App extends Component {
  state = {
    file: {
      fileName: "",
      page: 1,
      totalPage: 0,
      content: null,
      error: null,
      isLoading: false
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

  setLoading(isLoading) {
    return new Promise(resolve => {
      this.setState(prevState => {
        return {
          file: {
            ...prevState.file,
            isLoading
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
      this.setLoading(true);
      const response = await fileBrowserApi(params);
      let { content, totalPage, page } = response;
      page = parseInt(page, 10); // cause api response has type string
      this.setState(prevState => {
        return {
          file: {
            ...prevState.file,
            page,
            totalPage,
            content,
            error: null,
            isLoading: false
          }
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
            error: message,
            isLoading: false
          }
        };
      });
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">File content viewer</h1>
        </header>
        <p className="App-intro" />
        <Container>
          <Row>
            <Col>
              <FileSearchBar
                file={this.state.file}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 12 }}>
              <FileContentList {...this.state.file} />
            </Col>
            <Col xs={{ size: 12 }}>
              <FileContentPagination
                {...this.state.file}
                onPaginate={this.onPaginate}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
