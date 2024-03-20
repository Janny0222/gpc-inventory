import React, { FormEvent, ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  companyName: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  tablename: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, companyName, onSubmit, children, tablename }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-3xl font-semibold">{companyName} Inventory</h3>
            
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl text-black outline-none focus:outline-none">×</span>
            </button>
          </div>
          <div className="flex-auto p-6">
            {children }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
