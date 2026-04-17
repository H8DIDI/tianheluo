import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import IndustryChain from './pages/IndustryChain';
import News from './pages/News';
import Data from './pages/Data';
import Tools from './pages/Tools';
import Changelog from './pages/Changelog';
import Simulator from './pages/Simulator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tools/simulator" element={<Simulator />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chain" element={<IndustryChain />} />
          <Route path="/news" element={<News />} />
          <Route path="/data" element={<Data />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
