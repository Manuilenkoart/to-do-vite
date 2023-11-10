import { useCallback, useState } from 'react';

interface ModalHandlers {
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleModalOpen: () => void;
}

function useModalHandlers(): ModalHandlers {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = useCallback(() => setIsModalOpen(false), []);
  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);

  return {
    isModalOpen,
    handleModalClose,
    handleModalOpen,
  };
}

export default useModalHandlers;
