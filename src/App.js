import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { WatchlistContextProvider } from './context/WatchlistContext';
import StockDetailsPage from './pages/StockDetailsPage';
import StockOverviewPage from './pages/StockOverviewPage';

function App() {
  return (
    <div className="App">
      <div className='container'>
      <WatchlistContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<StockOverviewPage/>} />
        <Route path='/details/:symbol' element={<StockDetailsPage />} />
      </Routes>
      </BrowserRouter>
      </WatchlistContextProvider>
    </div>
    </div>
  );
}

export default App;
