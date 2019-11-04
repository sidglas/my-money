import React from 'react'
import { useState } from 'react'
import Rest from '../utils/rest'

//console.log(props.match.params.data)
console.log('chegando de um redirect 011?')
const baseUrl = 'https://mymoney-dvpleno.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl)

const Movimentacoes = ({match}) => {
  console.log('chegando de um redirect 012?')
  const data = useGet(`movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`meses/${match.params.data}`)

  console.log('dataMeses', dataMeses)

  const [dataPatch, patch] = usePatch()
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, remover] = useDelete()
  console.log(data[1])
  //controlled form
  const[descricao, setDescricao]= useState('')
  const[valor, setValor]= useState('')

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = evt => {
    setValor(evt.target.value)
  }

  const salvarMovimentacao = async () => {

    if (!isNaN(valor)  && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {

    
      await salvar ({
        descricao,
        valor: parseFloat(valor)
      })
      data.refetch()
      await sleep(3000)
      dataMeses.refetch()      
      setDescricao('')
      setValor('')
    }
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve,time))
  const removerMovimentacao = async(id) => {
    await remover(`movimentacoes/${match.params.data}/${id}`)
    data.refetch()
    await sleep(3000)
    dataMeses.refetch()

  }

  const alterarPrevisaoEntrada = (evt) => {
    //console.log(evt.target.value)
    patch(`meses/${match.params.data}`, {previsao_entrada: evt.target.value})

  }

  const alterarPrevisaoSaida = (evt) => {
    //console.log(evt.target.value)
    patch(`meses/${match.params.data}`, {previsao_saida: evt.target.value})

  }  

/*
  const removerMovimentacao = async(id) => {
    await remover(`movimentacoes/${match.params.data}/${id}`)
    setTimeout(() => {
      data.refetch()
    }, 3000)
    setTimeout(() => {
      dataMeses.refetch()
    }, 3000)
  }
*/  
  return (

    <div className='container'>
      <h1> Movimentações </h1>
      {
        !dataMeses.loading && dataMeses.data  && <div>
          <span>Previsão de entrada: {dataMeses.data.previsao_entrada} <input type='text' onBlur={alterarPrevisaoEntrada} /></span> / Previsão de saída: {dataMeses.data.previsao_saida} <input type='text' onBlur={alterarPrevisaoSaida} /><br />
          Entradas: {dataMeses.data.entradas} / Saídas: {dataMeses.data.saidas} 
        </div>
      }
      <table className='table'>
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Valor </th>
          </tr>
        </thead>
        <tbody>
        { data.data &&
          Object
            .keys(data.data)
            .map(movto => {
              return (
                <tr key={movto}>
                  <td>{data.data[movto].descricao}</td>
                  <td className='text-right'>
                    {data.data[movto].valor} {' '}
                    <button className='btn btn-danger' onClick={ () => removerMovimentacao(movto)}>-</button>
                  
                  </td>
                </tr>
              )
            })
        }
        <tr>
          <td> 
            <input type='text'  value={descricao} onChange={onChangeDescricao}/> 
          </td>
          <td> <input type='text' value={valor} onChange={onChangeValor} />
            <button className='btn btn-success' onClick={salvarMovimentacao}>+</button> 
           </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Movimentacoes