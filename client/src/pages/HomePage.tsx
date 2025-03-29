import Navbar from "../components/Navbar";
import ShipperDashboard from "./ShipperDashboard";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "0px" }}>
        {/* Adjust based on Navbar height */}
        <ShipperDashboard />
      </div>
    </>
  );
};

export default HomePage;
