import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../components/authContext";
import Logo from "../assets/items_logo.svg";
import LoadingSpinner from "../components/loadingSpinner";
import { IoIosHelpCircle } from "react-icons/io";
// import axios from "axios";

function RegistrationPage() {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // const clientId = '660983091583-h8q6io9okkv9rd7ecqhdg49k60m0ib5a.apps.googleusercontent.com';

  // const handleGoogleSuccess = async (response) => {
  //   const { credential } = response;
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/auth/google", {access_token});
  //     console.log('Backend response: ', res.data);
  //     const data = await res.json();
  //     if (res.ok) {
  //       login(data.token);
  //       navigate("/itemsPay");
  //     } else {
  //       setError(data.error);
  //     }
  //   } catch (err) {
  //     setError("Google login failed");
  //   }
  // };

  // const handleGoogleFailure = (response) => {
  //   setError("Google login failed");
  //   console.error("Google login failed: ", response);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    const staffRegex = /^\d{4,5}$/;
    const studentRegex = /^\d{6}$/;

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
    if (!email || !number || !password ) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    // const number = formData.get("number");
    // const email = formData.get("email");
    // const password = formData.get("password");
    // const role = formData.get("role");

    console.log({ number, email, password });

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, number }),
        credentials: "include",
      });

      // const data = await res.json();
      // console.log(res.data);
      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col-3 justify-between pt-10 ">
        {/* Logo */}
        <div className="align-start ml-8">
          <img src={Logo} alt="ITeMS logo" className="w-40" />
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

      <div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-blue-500 text-3xl">Register</h1>
          {/* <h3 className=" text-gray-500 mt-4">
            Create an account.
          </h3> */}
        </div>
        <br />
        <div className="grid grid-cols-2">
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-8"
            >
              {error && (
                <div className="bg-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              <input
                className=" w-{3rem} h-12 text-center text-md px-12 border-red border-solid bg-gray-200 rounded-lg"
                type="text"
                placeholder="Student or Staff Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
              <input
                className=" w-{3rem} h-12 text-center text-md px-12 border-red border-solid bg-gray-200 rounded-lg"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* <input
            className=" w-{3rem} h-12 text-center text-md px-32 border-red border-solid bg-gray-200 rounded-lg"
            type="text"
            placeholder="Role: Staff or student?"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          /> */}
               <input
                className=" w-{3rem} h-12 text-center text-md px-12 border-red border-solid bg-gray-200 rounded-lg"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/*<select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className=" w-{32rem} h-12 text-center text-md px-24 border-red border-solid bg-gray-200 rounded-lg"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Staff">Staff</option>
              </select> */}
              <button
                className="w-{4rem} h-12 bg-blue-500 hover:bg-blue-700 text-black mt-4 px-28 justify-center items-center text-center rounded-xl text-md"
                type="submit"
              >
                {isLoading ? <LoadingSpinner /> : "Register"}
              </button>
            </form>
          </div>

          {/* <div className="mt-4 text-center">
            <GoogleLogin
              clientId={clientId}
              buttonText="Register with Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
            <Link to="/login">Already have an account? Login</Link>
            <div className="">
              <p className="">
                <IoIosHelpCircle className="">
                  <Link to="/help" className="text-blue-600 hover:underline">
                    Need help?
                  </Link>
                </IoIosHelpCircle>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default RegistrationPage;
