// This outlet is where the child routes will be rendered from main.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const location = useLocation();

  // Check if the current location is the root path
  const isRoot = location.pathname === '/';

  return (
    <>
      {/* if the root isn't '/' then display the Header */}
      {/* {!isRoot && <Header />} */}
      <Outlet />
    </>
  );
};
export default App;
