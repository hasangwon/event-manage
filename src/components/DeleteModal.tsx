import React from "react";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onClose, onDelete }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">이 이벤트를 삭제하시겠습니까?</p>
        <div className="flex space-x-4 justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            취소
          </button>
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
