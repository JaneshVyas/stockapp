import React, { useContext, useEffect, useState } from 'react'
import FinHub from '../apis/FinHub'
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import { WatchlistContext } from '../context/WatchlistContext'
import { useNavigate } from 'react-router-dom'

const StockList = () => {

    const [stock, setStock] = useState([])

    const changeColor = (change) => {
      return change>0?'success':'danger'
    }

    const navigate = useNavigate()

    const renderIcon = (change) => {
      return change>0?<BsFillCaretUpFill />:<BsFillCaretDownFill />
    }

    const { watchList, deleteStock } = useContext(WatchlistContext)

    const handleStockSelect = (symbol) => {
      navigate(`details/${symbol}`)
    }

    useEffect(() => {
        let isMounted=true
      const fetchdata = async() => {
        const responses=[]
        try {
            const responses=await Promise.all(watchList.map((stock)=>{
                return FinHub.get("/quote",{
                    params: {
                        symbol: stock
                    }
                })
            }))
            console.log(responses)
            const data=responses.map((response)=>{
                return {
                    data: response.data,
                    symbol: response.config.params.symbol
                }
            })
            console.log(data)
            if(isMounted) {
                setStock(data)
            }
        } catch (err) {
            
        }
      }
      fetchdata()
      return () => (isMounted=false)
    }, [watchList])
    

  return (
    <div>
        <table className='table hover mt-5'>
            <thead style={{color: "rgb(78, 89, 102)"}}>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Last</th>
                    <th scope='col'>Chg</th>
                    <th scope='col'>Chg%</th>
                    <th scope='col'>High</th>
                    <th scope='col'>Low</th>
                    <th scope='col'>Open</th>
                    <th scope='col'>PClose</th>
                </tr>
            </thead>
            <tbody>
            {stock.map((stockData) => {
          return (
            <tr style={{cursor: 'pointer'}} onClick={()=>handleStockSelect(stockData.symbol)} className="table-row" key={stockData.symbol}>
              <th scope="row">{stockData.symbol}</th>
              <td>{stockData.data.c}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.d)}</td>
              <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
              <td>{stockData.data.h}</td>
              <td>{stockData.data.l}</td>
              <td>{stockData.data.o}</td>
              <td>{stockData.data.pc} <button onClick={(e)=>{
                e.stopPropagation()
                deleteStock(stockData.symbol)
              }} className='btn btn-danger btn-sm ml-3 d-inline-block delete-button'>Remove</button></td>
            </tr>
          )
        })}
            </tbody>
        </table>
    </div>
  )
}

export default StockList