import { Button, Modal } from 'react-bootstrap'

const AlertModal = ({ show, onClose, title, message, variant = 'primary', btnMsg = 'OK' }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className='text-center' closeButton >
        <Modal.Title>{title || 'Alert'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <p>{message || 'Something went wrong!'}</p>
      </Modal.Body>
      <Modal.Footer className='text-center'>
        <Button variant={variant} onClick={onClose} >{btnMsg}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AlertModal