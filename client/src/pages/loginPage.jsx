/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Logo from "../assets/items_logo.svg";
import { IoIosHelpCircle } from "react-icons/io";
import { AuthContext } from "../components/authContext";
import LoadingSpinner from "../components/loadingSpinner";

function LoginPage() {
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
  const staffRegex = /^\d{4,5}$/;
  const studentRegex = /^\d{6}$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      setIsLoading(false);
      return;
    }
    if (!staffRegex.test(number) && !studentRegex.test(number)) {
      setError("Invalid staff or student number format");
      setIsLoading(false);
      return;
    }
    if (!passRegex.test(password)) {
      setError(
        "Invalid password format. Password must consist of a uppercase letter, a lowercase letter, a special character and a number. It must be at least 6 characters long"
      );
      setIsLoading(false);
      return;
    }
    if (!email || !number || !password || !role) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    const loginData = { number, email, password, role };

    // const number = formData.get("number");
    // const email = formData.get("email");
    // const password = formData.get("password");
    // const role = formData.get("role");

    // console.log({ number, email, password, role })

    // const loginData = {
    //   number: "236737",
    //   email: "faramadetoluwanimi1@gmail.com",
    //   password: "236737",
    //   role: "Student",
    // };
    try {
      console.log("Sending login request", loginData);
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      console.log(loginData);

      const data = await response.json();
      if (!response.ok) {
        console.error("Login error:", data.error);
        setError(data.error);
        alert("Login failed: " + data.error);
      } else {
        // Handle successful login here
        console.log("Login successful", data);
        // alert(data.message);
        login(data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      alert("An unexpected error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    try {
      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        body: JSON.stringify({ token: credential }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        login(data.token);
        navigate("/dashboard");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Google login failed.");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    setError("Google login failed.");
  };
  // if (redirect) {
  //   return <Navigate to={"/itemsPay"} />;
  // }

  return (
    <div>
      <div className="flex flex-col-3 justify-between pt-10 ">
        {/* Logo */}
        <div className="align-start ml-8">
          <img src={Logo} alt="logo" className="w-40" />
        </div>
        {/* Help Icon and Login Button */}
        <div className="flex flex-col-2 justify-end mr-4">
          <IoIosHelpCircle className="text-5xl text-blue-500 mr-12" />
          <Link to="/itemsPay">
            <button className="bg-blue-500 text-white w-32 px-6 h-12 py-2 rounded-xl">
              Home
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mt-24">
        <h1 className="text-blue-500 text-5xl">Login</h1>
        <h3 className=" text-gray-500 mt-4">
          Enter your details to sign into your account
        </h3>
      </div>
      <br />
      <form
        className="flex flex-col items-center gap-8"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            className=" w-{8rem} h-12 text-center text-md px-32 border-red border-solid bg-gray-200 rounded-lg"
            type="text"
            placeholder="Matriculation or Staff Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <input
            className=" w-{8rem} h-12 text-center text-md px-32 border-red border-solid bg-gray-200 rounded-lg"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <input
            className=" w-{8rem} h-12 text-center text-md px-32 border-red border-solid bg-gray-200 rounded-lg"
            type="text"
            placeholder="Role: Staff or student?"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          /> */}
          <input
            className=" h-12 w-{8rem} bg-gray-200 px-32 text-center text-md rounded-lg "
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select your role</option>
            <option value="Student">Student</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {error && <span>{error}</span>}
        <button
          className="w-{8rem} h-12 bg-blue-500 text-black mt-4 px-48 text-center rounded-xl text-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>
      <div className="flex flex-col items-center mt-4">
        <GoogleLogin
          clientId="660983091583-h8q6io9okkv9rd7ecqhdg49k60m0ib5a.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <div className="text-center mt-4">
        <Link to="/register" className="text-blue-500">
          Don't have an account? Register here
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
