import React from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import { simpleStoreContract } from '../../simpleStore'
import nervos from '../../nervos'
require('./list.css')

const Record = ({ time, text, hasYearLabel }) => {
  const _time = new Date(+time);
  const timeFormatter = time => ('' + time).padStart(2, '0');

  return (
    <div className="list__record--container">
      {hasYearLabel ? <div className="list__record--year">{_time.getFullYear()}</div> : null}
      <span>{`${_time.getMonth() + 1}-${timeFormatter(_time.getDate())} ${timeFormatter(_time.getHours())}:${timeFormatter(_time.getMinutes())}`}</span>
      <Link to={`/show/${time}`}>
        <div>{text}</div>
      </Link>
    </div>
  )
}

class List extends React.Component {
  state = {
    times: [],
    texts: [],
  }
  componentDidMount() {
    const from = nervos.base.accounts.wallet[0] ? nervos.base.accounts.wallet[0].address : '';
    simpleStoreContract.methods
      .getList()
      .call({
        from,
      })
      .then(times => {
        times.reverse()
        this.setState({ times })
        return Promise.all(times.map(time => simpleStoreContract.methods.get(time).call({ from })))
      })
      .then(texts => {
        this.setState({ texts })
      })
      .catch(console.error)
  }
  render() {
    const { times, texts } = this.state
    return (
      <div className="list__record--page">
        {times.map((time, idx) => (
          <Record
            time={time}
            text={texts[idx]}
            key={time}
            hasYearLabel={idx === 0 || new Date(+time).getFullYear() !== new Date(+times[idx - 1]).getFullYear()}
          />
        ))}
        <BottomNav active={'list'} />
      </div>
    )
  }
}
export default List
