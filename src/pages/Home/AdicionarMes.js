import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'

const minano = 2019
const maxano = 2022

const AdicionarMes = () => {
  const refAno = useRef()
  const refMes = useRef()
  const [redir, setRedir]= useState('')
  const anos = [] 
  for (let i = minano; i <= maxano; i++) {
    anos.push(i)
  }

  const meses = [] 
  for (let i = 1; i <= 12; i++) {
    meses.push(i)
  }

  const zeroPad = num => {
    if (num <10) {
      return '0' + num
    }
    return num
  }

  const verMes  = () => {
    setRedir(refAno.current.value + '-' + refMes.current.value)
  }

  if (redir !== '') {
    return  <Redirect to={'/movimentacoes/' + redir} />
  }
  return  (
    <>
    <h2>Adicionar Mês</h2>

    <select ref={refAno}>
      { 
        anos.map(ano => <option key={ano} value={ano}> {ano} </option>)}
    </select>
    <select ref={refMes}>
      { meses.map(zeroPad).map(mes => <option key={mes} value={mes}> {mes} </option>)}
    </select>    

    <button onClick={verMes}> Adiciona Mês</button>
    </>
  )
}
export default AdicionarMes

