import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TruckerDashboard from "./pages/TruckerDashboard";
import ProtectedRoute from "./routes/TruckerprotectedRoute";
import TruckerprotectedRoute from "./routes/TruckerprotectedRoute";
import ShipperprotectedRoute from "./routes/ShipperprotectedRoute";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/trucker"
            element={
              <TruckerprotectedRoute>
                <TruckerDashboard />
              </TruckerprotectedRoute>
            }
          />
          <Route
            path="/shipper"
            element={
              <ShipperprotectedRoute>
                <HomePage />
              </ShipperprotectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
