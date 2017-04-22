import React from 'react'
import './App.less'
import { connect } from 'react-redux'

class App extends React.Component {
  uploadHandlder = (e) => {
    var files = e.target.files
    var output = []
    for (var i = 0; i < files.length; i++) {
      output.push(files[i])
    }
    this.props.uploadFile(output)
    e.target.value = ''
  }

  render () {
    const { isLoading, error, files } = this.props.store

    const progress = () => {
      if (isLoading) {
        return 'File is uploading...'
      } else if (error) {
        return 'Error'
      } else if (!isLoading && isLoading !== undefined && !error && error !== undefined) {
        return 'Done!'
      } else {
        return ''
      }
    }

    return (
      <div>
        <form encType='multipart/form-data' method='post' >
          <input type='file' name='file' onChange={this.uploadHandlder} multiple />
        </form>
        <p>{progress()}</p>
        <ul>
          {files.length < 0 ? 'No files' : files.map(({ key, filename, size, link }) => (
            <li key={key}>
              <a target='_blank' href={link}>{filename} <span>({size} KB)</span></a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

}

export default connect(
  (state) => ({ store: state }),
  (dispatch) => ({
    uploadFile: function upload (files, count = 0) {
      if (count < files.length) {
        dispatch({ type: 'UPLOAD_FILE' })
        let fileCount = count
        const filename = files[fileCount].name
        const size = files[fileCount].size
        var xhr = new XMLHttpRequest()
        var data = new FormData()
        data.append('file', files[fileCount])
        xhr.open('POST', 'https://file.io')
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            dispatch({ type: 'ADD_FILE', payload: { ...JSON.parse(xhr.response), filename, size } })
            fileCount++
            this.uploadFile(files, fileCount)
          } else {
            dispatch({ type: 'ERROR' })
          }
        })
        xhr.send(data)
      }
    }
  })
)(App)
