import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const WatchlistContext = createContext()

export const WatchlistContextProvider = (props) => {

    const [watchList, setWatchList] = useState(
        localStorage.getItem('watchList')?.split(',') || ["GOOGL", "MSFT", "AMZN"]
    )

    useEffect(()=>{
        localStorage.setItem('watchList', watchList)
    }, [watchList])

    const addStock = (stock) => {
        if(watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el)=>{
            return el!==stock
        }))
    }

    return <WatchlistContext.Provider value={{ watchList, addStock, deleteStock }}>
        {props.children}
    </WatchlistContext.Provider>
}