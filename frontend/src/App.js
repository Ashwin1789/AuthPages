import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
