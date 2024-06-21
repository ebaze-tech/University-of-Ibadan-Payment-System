import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner";

function VerificationPage() {
  const { userId, token } = useParams();
  console.log("userId:", userId);
  console.log("token", token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        if(!userId || !token){
          throw new Error('Invalid verification link.');
        }

        const response = await fetch(
          `http://localhost:5000/verify/${userId}/${token}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Verification failed.");
        }

        // Optionally, you can redirect the user to another page after successful verification
        const data = await response.json();
        alert(data.message);

        navigate('/dashboard');
      } catch (error) {
        console.error("Verification error:", error);
        alert("Account verification failed");
        navigate("/register");
      } finally {
        setLoading(false);
      }
    };

    verifyAccount();
  }, [userId, token, navigate]);

  if(loading){
    return <LoadingSpinner/>;
  }
  
  return (
    <div>
        <p>Verifying your account....</p>
    </div>
  );
}

export default VerificationPage;
