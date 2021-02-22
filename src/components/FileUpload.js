import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, withStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import UploadFileService from "../services/UploadFileService";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      snackbarOpen: false,
    };
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,

    });
  }

  handleClose() {
    this.setState({snackbarOpen: false});
  };

  componentDidMount() {
    
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadFileService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: "Successfully process the file",
          isError: false,
          snackbarOpen: true
        });
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          progress: 0,
          message: "Failed to process the file",
          currentFile: undefined,
          isError: true,
          snackbarOpen: true
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      isError
    } = this.state;
    
    return (
      <div>
        {currentFile && (
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }
        <Box m={1}>
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: 'none' }}
              type="file"
              accept=".csv"
              onChange={this.selectFile} />
            <Button
              className="btn-choose"
              variant="outlined"
              component="span" >
               Choose Files
            </Button>
          </label>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!selectedFiles}
            onClick={this.upload}>
            Upload
          </Button>
        </Box>
        <Box x={1}>
          <div className="file-name">
            {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
          </div>
        </Box>
        <Snackbar open={this.state.snackbarOpen} autoHideDuration={2500} message={this.state.message} onClose={() => this.setState({snackbarOpen:false})} />
      </div>
    );
  }
}