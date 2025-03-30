import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TruckerDashboard from "./pages/TruckerDashboard";
import TruckerprotectedRoute from "./routes/TruckerprotectedRoute";
import ShipperprotectedRoute from "./routes/ShipperprotectedRoute";
import ChatInbox from "./pages/ChatInbox";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/inbox" element={<ChatInbox />} />
          <Route
            path="/trucker"
            element={
              // <TruckerprotectedRoute>
              // </TruckerprotectedRoute>
              <TruckerDashboard />
            }
          />
          <Route
            path="/"
            element={
              // <ShipperprotectedRoute>
              // </ShipperprotectedRoute>
              <HomePage />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
