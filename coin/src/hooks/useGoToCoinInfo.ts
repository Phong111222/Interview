import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'routers/index';

const useGoToCoinInfo = () => {
  const navigate = useNavigate();

  const onNavigateToCoinInfo = useCallback(
    (coinId: string) => {
      navigate(`${AppRoutes.coinInfo.replace(':coinId', coinId)}`);
    },
    [navigate]
  );

  return onNavigateToCoinInfo;
};

export default useGoToCoinInfo;
