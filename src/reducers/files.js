export const GET_LIST = 'GET_LIST'
export const UPLOAD_FILE = 'UPLOAD_FILE'
export const ADD_FILE = 'ADD_FILE'
export const ERROR = 'ERROR'

export default function fileUploader (state, action) {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state
      }
    case UPLOAD_FILE:
      return {
        ...state,
        isLoading: true
      }
    case ERROR:
      return {
        error: true
      }
    case ADD_FILE:
      return addFile(state, action.payload)
    default:
      return state
  }
}

function addFile (state, file) {
  state.files.push(file)
  return {
    ...state,
    isLoading: false,
    error: false
  }
}
