import React from 'react'
import { Link } from 'react-router-dom'
import Rest from '../utils/rest'

//console.log(props.match.params.data)
const baseUrl = 'https://mymoney-dvpleno.firebaseio.com/'
const { useGet } = Rest(baseUrl)

const Movimentacoes = ({match}) => {
  const data = useGet(`movimentacoes/${match.params.data}`)
console.log(data[1])
  return (

    <div className='container'>
      <h1> asasasas </h1>
      <h1> Movimentações </h1>
      <pre> {JSON.stringify(data.data)} </pre>
      <pre> {JSON.stringify(data.data['0'])} </pre>

        <pre>{match.params.data}</pre>
        {
           Object
           .keys(data.data)
           .map(pmes => {
              return ( 
                data.data[pmes] !== null &&
                (
                <div key={pmes}>
                <h1> {pmes}  </h1>
                <h2> {data.data[pmes]['descricao']} </h2>
                <h2> {data.data[pmes]['valor']} </h2>
                </div>
                )
                )


            }
            )       
        }

    </div>
  )
}

export default Movimentacoes