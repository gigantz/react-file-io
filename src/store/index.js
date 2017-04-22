import { createStore, applyMiddleware, compose } from 'redux'
import files from '../reducers/files'
import thunk from 'redux-thunk'

export default (initialState = { files: [] }) => {
  const store = createStore(
    files,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}
