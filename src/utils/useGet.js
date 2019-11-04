import { useReducer, useEffect, useState } from 'react';
import axios from 'axios'

const reducer = (state, action) => {

  console.log('state ', state, ' action ', action)
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


//reusabilidade!!
const useGet = url => {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  })


  useEffect(() => {
    dispatch({ type: 'REQUEST' })
    axios
      .get(url)
      .then( res => {
        /*
        setData({
          loading: false,
          data: res.data
        })
        */
        console.log('antes SUCCESS')
        dispatch({ type: 'SUCCESS', data:res.data })
      })
  }, [url])
  return data    
}

export default useGet
