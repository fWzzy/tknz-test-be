import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';
import { IAsk } from './interfaces/ask.interface';
import { IBid } from './interfaces/bid.interface';
import OrderBook, { OrderType } from './components/OrderBook/OrderBook';
import debounce from './utils/debounce';
import { postData } from './utils/http';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || window.location.origin

function App() {
  const [bid, setBid] = useState<IBid[]>([])
  const [ask, setAsk] = useState<IAsk[]>([])

  const [sumBid, setSumBid] = useState(0);
  const [sumAsk, setSumAsk] = useState(0);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.on('tickers', (data: { listBid: IBid[], listAsk: IAsk[] }) => {
      setBid(data.listBid);
      setAsk(data.listAsk)
      setSumBid(data.listBid.reduce((curr, n) => curr + n.price * n.quantity, 0))
      setSumAsk(data.listAsk.reduce((curr, n) => curr + n.quantity, 0))
    })
  }, [])

  const changeBidRule = debounce((limit: number) => {
    postData('set-bid-rule', { limit })
  }, 200)

  const changeAskRule = debounce((limit: number) => {
    postData('set-ask-rule', { limit })
  }, 200)

  return (
    <div className="container">
      <div className="col">
        <OrderBook type={OrderType.BID} data={bid} />
        <p>Sum of (size * price): {sumBid}</p>
        <input type="number" onChange={(e) => changeBidRule(+e.currentTarget.value)} />
      </div>
      <div className="col">
        <OrderBook type={OrderType.ASK} data={ask} />
        <p>Sum of size: {sumAsk}</p>
        <input type="number" onChange={(e) => changeAskRule(+e.currentTarget.value)} />
      </div>
    </div>
  );
}

export default App;
