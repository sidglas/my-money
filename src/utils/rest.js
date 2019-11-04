import { useReducer, useEffect } from 'react'
import axios from 'axios'

const INITIAL_STATE = {
  loading: false,
  data: {}
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
  // Manipular meu estado
  return state
}
const init = baseUrl => {
// na refatoração url vira resource, que na verdade é o que vai além do "prefixo" da url
	const useGet = resource => {
	  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
    const carregar = async() => {
      dispatch({ type: 'REQUEST' })  
      const res = await axios.get(baseUrl + resource + '.json') 
      dispatch({ type: 'SUCCESS', data:res.data })     
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
    const res = await axios.post(baseUrl + resource + '.json', data)
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
    dispatch({type:'REQUEST' })
    await axios.delete(baseUrl + resource + '.json')
    dispatch
      ({type:'SUCCESS'
    })
  } 
  return[data, remove]
}

const usePatch = () => {
  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })  
  const patch =  async (resource, data) => {
    dispatch({type:'REQUEST' })
    await axios
      .patch(baseUrl + resource + '.json', data)
    dispatch
      ({type:'SUCCESS'
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


export default init