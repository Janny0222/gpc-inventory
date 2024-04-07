import { PencilIcon, PlusIcon, TrashIcon, QrCodeIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';

interface CreateInventoryProps {
  onClick: () => void;
}
interface PropsForID {
  id: number;
  onClick: (id: number) => void;
}

export function CreateInventory({onClick}: CreateInventoryProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center h-10 px-4 text-sm font-medium text-white transition-colors rounded-lg create-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create New</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </button>
  );
}

export function UpdateInventory({ id, onClick }: PropsForID) {
  return (
    <button
      onClick={() => onClick(id)}
      className="p-2 border rounded-md hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </button>
  );
}

export function QRGenerator ({ id, onClick }: PropsForID) {
  return (
    <button 
    onClick={() => onClick(id)}
    className="p-2 border rounded-md hover:bg-gray-100">
      <QrCodeIcon className='w-5' />  
    </button>
  )
}

export function UpdateMobileInventory({ id, onClick }: PropsForID) {
  return (
    <button
      onClick={() => onClick(id)}
      className="p-2 border rounded-md hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </button>
  );
}

// export function DeleteInventory({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null,id);
//   return (
//     <form action={deleteInvoiceWithId}>
//       <button className="p-2 border rounded-md hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
