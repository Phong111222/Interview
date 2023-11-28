import CoinLayout from 'components/modules';
import CoinInformation from 'components/modules/CoinInformation';
import LisTrendingCoins from 'components/modules/ListTrendingCoins';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppRoutes from 'routers';
function App() {
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<CoinLayout />}>
        <Route path={AppRoutes.home} element={<LisTrendingCoins />} />
        <Route path={AppRoutes.coinInfo} element={<CoinInformation />} />
      </Route>
    </Routes>
  );
}

export default App;
