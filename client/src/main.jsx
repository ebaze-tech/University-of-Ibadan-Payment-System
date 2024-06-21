import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AdminDashboard from "./pages/adminDashboard";
import HomePage from "./pages/homePage";
import ItemsPay from "./pages/itemsPay/App";
import RegistrationPage from "./pages/registrationPage";
import LoginPage from "./pages/loginPage";
import RequestPasswordReset from "./components/requestPasswordReset";
import ResetPassword from "./components/resetPassword";
import IDCardProcessing from "./pages/ID cardProcessing";
import CardApply from "./pages/CardApply";
import VerificationPage from "./pages/verificationPage";
import "./index.css";

const App = () => {
  const isAdmin = () => {
    const tokenCookie = document.cookie
      .split(";")
      .find((row) => row.startsWith("token="));
    if (!tokenCookie) return false; //No token found

    const token = tokenCookie.split("=")[1];
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.role === "Admin";
    } catch (error) {
      console.error("Error decoding token: ", error);
      return false;
    }
  };

  return (
    <GoogleOAuthProvider clientId="660983091583-h8q6io9okkv9rd7ecqhdg49k60m0ib5a.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path='/verify' element={<VerificationPage />} />
            <Route
              path="/admin"
              element={isAdmin() ? <AdminDashboard /> : <Navigate to="/register" />}
            />
            <Route path="/request-password-reset" element={<RequestPasswordReset />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/itemsPay" element={<ItemsPay />} />
            <Route path="/apply" element={<CardApply />} />
            <Route path="/service/ID card prOcessing" element={<IDCardProcessing />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};
{/* <Route path="/verify" element={<VerificationPage/>}/> */ }
{/* <Route path="/authenticate" element={<Authenticate />} /> */ }
{/* <Route path="/logout" element={<LogoutPage />} /> */ }
{/* <Route path="/service/portal_access" element={<PortalAccess />} />
        <Route path="/service/passport_change" element={<PassportChange />} />
        <Route path="/service/signature_change" element={<SignatureChange />} />
        <Route path="/service/student_late_complaint" element={<StudentLateComplaint />} />
        <Route path="/service/pensioner_service" element={<PensionerService />} />
        <Route path="/service/profile_correction" element={<ProfileCorrection />} />
        <Route path="/service/student_change_of_hall" element={<StudentChangeOfHall />} />
        <Route path="/service/others_change_of_hall" element={<OthersChangeOfHall />} />
        <Route path="/service/resumption_of_studies" element={<ResumptionOfStudies />} />
        <Route path="/service/ICT_Training" element={<ICTTraining />} /> */}
{/* </Routes> */ }
{/* </AuthProvider> */ }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
