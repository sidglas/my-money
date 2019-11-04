import { useReducer } from 'react';  
import axios from 'axios'

const reducer = (state, action) => {
// Manipular meu estado
  if (action.type === 'REQUEST'){
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS'){
    return {
      ...state,
      loading: false,
      data:action.data
    }
  }  
  // Manipular meu estado
  return state
}

const usePost = (url) => {
	const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })	
  const post = data => {
    dispatch({type:'REQUEST' })
    axios
    .post(url, data)
    .then(res => {
      dispatch({type:'SUCCESS',
      data: res.data  
      })
    })
  }	
  return[data, post]
}
export default usePost