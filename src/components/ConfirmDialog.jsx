import React, { useEffect, useState } from 'react';

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
    const [show, setShow] = useState(false);

    // Trigger animation on mount
    useEffect(() => {
        setTimeout(() => setShow(true), 10);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            onCancel();
        }, 100); // Match the transition duration
    };

    const handleBackdropClick = (e) => {
        if (e.target.id === 'backdrop') {
            handleClose();
        }
    };

    return (
        <div
            id="backdrop"
            onClick={handleBackdropClick}
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div
                className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-sm transform transition-all duration-300 ${show ? 'scale-100' : 'scale-95 opacity-0'
                    }`}
            >
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setShow(false);
                            setTimeout(() => onConfirm(), 100);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
