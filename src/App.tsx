import { useState, useEffect } from "react";
import ReportPhoto from "./pages/ReportPhoto";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return <ReportPhoto />;
}

export default App;
