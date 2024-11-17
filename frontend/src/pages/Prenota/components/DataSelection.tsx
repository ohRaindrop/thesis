import { useContext } from 'react'
import { Input } from '../../../components'
import { ReservationContext, ReservationDispatchContext } from '../../../state/Reservation'
import { Actions } from '../../../state/Reservation/enums'
import { formatDate } from '../utils'

type Props = {
  setShowUserData: (value: boolean) => void
}

const DataSelection = ({setShowUserData}: Props) => {
  const today = formatDate(new Date())
  const state = useContext(ReservationContext)
  const dispatch = useContext(ReservationDispatchContext)

  const handleChange = (value: string | number, action: Actions) => {
    if(dispatch) dispatch({ type: action, payload: value })
  }

  return (
    <section className='side data-selection'>
      <Input type='date'
        label='Giorno'
        value={state?.date}
        onChange={(e) => { handleChange(e.target.value, Actions.UPDATE_DATE) }}
        min={today}
      />
      <Input type='number'
        label='Numero di persone'
        value={state?.peopleNum}
        onChange={(e) => {
          let val = parseInt(e.target.value)
          if (val < 0) val = 1;
          if (val > 6) val = 6;
          handleChange(val, Actions.UPDATE_PEOPLE)}
        }
        min={1}
        max={6}
      />
      <button onClick={() => { setShowUserData(true) }}> Inserisci i tuoi dati</button>
    </section>
  )
}

export default DataSelection