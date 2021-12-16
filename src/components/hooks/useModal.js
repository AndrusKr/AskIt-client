import { useState } from "react";

export const useModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return [openModal, handleOpen, handleClose];
};
