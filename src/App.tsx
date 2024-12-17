import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;