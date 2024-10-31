const ModalAdminArchive = ({contentPrefix = "Êtes-vous sûr de vouloir archiver", contentSuffix, onConfirm, onCancel }) => {
    return (
        <div className="modal">
            <div className="modal__content">
                <h2>Archiver</h2>
                <p>{`${contentPrefix} ${contentSuffix}`}</p>
                <button onClick={onConfirm}>Oui</button>
                <button onClick={onCancel}>Non</button>

            </div>

            
        </div>
    );
};

export default ModalAdminArchive;