import { Fragment } from 'react'
import { IAsk } from '../../interfaces/ask.interface';
import { IBid } from '../../interfaces/bid.interface';
import styles from './OrderBook.module.css'

export enum OrderType {
  BID = 'BID',
  ASK = 'ASK',
}

type IProps = {
  type: OrderType,
  data: IBid[] | IAsk[],
}

const BidList = (props: { data: IBid[] }) => {
  return (
    (
      <Fragment>
        <div className={`${styles['row']} ${styles['head']}`}>
          <div>Size</div>
          <div>Bid</div>
        </div>
        {
          props.data.map((n, i) => (
            <div key={i} className={styles['row']}>
              <div>{n.quantity}</div>
              <div>{n.price}</div>
            </div>
          ))
        }
      </Fragment>
    )
  )
}

const AskList = (props: { data: IAsk[] }) => {
  return (
    (
      <Fragment>
        <div className={`${styles['row']} ${styles['head']}`}>
          <div>Ask</div>
          <div>Size</div>
        </div>
        {
          props.data.map((n, i) => (
            <div key={i} className={styles['row']}>
              <div>{n.price}</div>
              <div>{n.quantity}</div>
            </div>
          ))
        }
      </Fragment>
    )
  )
}

export default function OrderBook({ type, data }: IProps) {
  return (
    <div className={styles['order-book']}>
      <div className={styles['order-table']}>
        {type === OrderType.BID ? <BidList data={data} /> : <AskList data={data} />}
      </div>
    </div>
  )
}