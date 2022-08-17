import { Button, Modal } from 'react-bootstrap';
import React from 'react';

export default function DeleteListModal({ show, handleClose, deleteList }) {
	return (
		<Modal id="deleteModal" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Delete List?</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete this list?</Modal.Body>
			<Modal.Footer>
				<Button id="cancelButton" onClick={handleClose}>
					Close
				</Button>
				<Button id="deleteButton" onClick={deleteList}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
