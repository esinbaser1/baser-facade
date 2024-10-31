import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalAdminDelete = ({ contentPrefix = "Êtes-vous sûr de vouloir supprimer", contentSuffix, onConfirm, onCancel, isOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            className="modal__content"
            overlayClassName="modal"
        >
            <h2>Suppression</h2>
            <p>{`${contentPrefix} ${contentSuffix}`}</p>
            <button onClick={onConfirm}>Oui</button>
            <button onClick={onCancel}>Non</button>
        </Modal>
    );
};

export default ModalAdminDelete;
