import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route } from "react-router-dom";
import SnackBarProvider from './contexts/SnackBarProvider';
import MainPageComponents from './components/MainPageComponents';

export default function App() {
  return (
    <div>
      <SnackBarProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<MainPageComponents />} />
        </Routes>
      </SnackBarProvider>
    </div>
  );
}
