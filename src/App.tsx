import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { Sidebar } from './components/Sidebar/Sidebar'
import DetailCharacter from './components/DetailCharacter';
import { useState, useEffect } from 'react';
import { NotFound } from './components/NotFound';

const useHasQuery = (): boolean => {
  const location = useLocation();
  return location.search !== '';
};


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const hasQuery = useHasQuery();
  const location = useLocation();
  const hasId = location.pathname !== '/';


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };


    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen text-slate-300 selection:bg-blue-600 selection:text-white flex">
        {(!isMobile || (!hasId && !hasQuery)) && <Sidebar />}
        
        <div className={`w-full text-slate-900 ${isMobile && !hasId && !hasQuery ? 'hidden' : 'block'}`}>
          <Routes>
            <Route 
              path="/:id" 
              element={<DetailCharacter />} 
            />
            
          </Routes>
        </div>

    </div>
  )
}

export default App