import { ModalProps } from '../types';

const BodyDelete = ({ show }: ModalProps) => {
  if ( !show ) return null;

  return (
      <>
        <h3> Sei sicuro di voler eliminare questa prenotazione? </h3>
        <p> L'operazione non è reversibile, i dati andranno persi. </p>
      </>
  )
}

export default BodyDelete