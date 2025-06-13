import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import ReportPhoto from "./pages/ReportPhoto";
import About from "./pages/About";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-[#f9fbfd]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/relatorio" element={<ReportPhoto />} />
            <Route path="/sobre" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
