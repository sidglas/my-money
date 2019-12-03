import { useReducer, useEffect } from 'react'
import axios from 'axios'
axios.defaults.validateStatus = code => code < 500

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: ''
}
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
  if (action.type === 'FAILURE'){
    return {
      ...state,
      loading: false,
      error:action.error
    }
  }    
  // Manipular meu estado
  return state
}
const getAuth = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return '?auth='+token
  }
  return ''
}
const init = baseUrl => {
  console.log(getAuth())
	const useGet = resource => {
	  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const carregar = async() => {
      try{
        dispatch({ type: 'REQUEST' })  
        console.log('BusCaR ' , baseUrl + resource + '.json')
        const res = await axios.get(baseUrl + resource + '.json' + getAuth()) 

        console.log('No Try ', res.data) 

        if (res.data.error && Object.keys(res.data.error).length > 0) {
          dispatch({ type: 'FAILURE', error: res.data.error})  
        }else{
          dispatch({ type: 'SUCCESS', data:res.data })  
        }   
      }catch(err){
        dispatch({ type: 'FAILURE', error: 'unknown error' })     
      }
    }
	  useEffect(() => {
      carregar()
	  }, [resource])

	  return {
      ...data,
      refetch: carregar
    }   
  }

const usePost = resource => {
  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })  
  const post = async (data) => {
    dispatch({type:'REQUEST' })
    const res = await axios.post(baseUrl + resource + '.json' + getAuth(), data)
    dispatch({type:'SUCCESS',
    data: res.data  
    })
  } 
  return[data, post]
}
const useDelete = () => {
  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })  
  const remove =  async (resource) => {
    dispatch({
      type:'REQUEST' 
    })
    await axios.delete(baseUrl + resource + '.json' + getAuth())
    dispatch ({
      type:'SUCCESS'
    })
  } 
  return[data, remove]
}

const usePatch = (resource) => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)  
  const patch =  async (data) => {
    dispatch({ type:'REQUEST' })
    await axios
      .patch(baseUrl + resource + '.json' + getAuth(), data)
    dispatch ({
      type:'SUCCESS'
    })
  } 
  return[data, patch]
}

  return {
    useGet,
    usePost,
    useDelete,
    usePatch
  }
}

export const usePost = resource => {
  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })  
  const post = async (data) => {
    dispatch({type:'REQUEST' })
    try {
      const res = await axios.post(resource , data)
      //caira neste if se tiver erro, mas este for < 500, como defini
      // para o axios
      if (res.data.error && Object.keys(res.data.error).length > 0) {
        dispatch({
          type:'FAILURE',
          error: res.data.error.message  
        })        
      }else {
        dispatch({
          type:'SUCCESS',
          data: res.data  
        })
        return res.data 
      }

    //
    }catch(err){
//      console.log(JSON.stringify(err))
      dispatch({
        type:'FAILURE',
        error: 'unknown error'  
      })      
    }
  } 
  return[data, post]
}

export default init