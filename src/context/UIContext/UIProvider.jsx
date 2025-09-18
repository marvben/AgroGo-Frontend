// context/UI/UIProvider.js
import { useState } from 'react';
import { UIContext } from './UIContext';
import Notification from '../../utils/Notification';
import useSnackbar from '../../hooks/useSnackbar';

export const UIProvider = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const { snack, setSnack, showSuccess, showError } = useSnackbar();

  return (
    <UIContext.Provider
      value={{
        showHeader,
        setShowHeader,
        showFooter,
        setShowFooter,
        showSuccess,
        showError,
      }}
    >
      {children}
      <Notification snack={snack} setSnack={setSnack} />
    </UIContext.Provider>
  );
};
