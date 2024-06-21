import React, { useState, useEffect } from "react";
import Logo from "../assets/ui_logo.svg";
import Close from "../assets/Close.png";

const CardApply = () => {
  const [number, setNumber] = useState("");
  const [policeReport, setPoliceReport] = useState(null);
  const [affidavit, setAffidavit] = useState(null);
  const [securityReport, setSecurityReport] = useState(null);
  // const [userNumber, setUserNumber] = useState("");

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'policeReport') {
      setPoliceReport(files[0]);
    } else if (name === 'affidavit') {
      setAffidavit(files[0]);
    } else if (name === 'policeReport') {
      setPoliceReport(files[0]);
    }
  }

  // useEffect(() => {
  //   const storedUserNumber = localStorage.getItem("userNumber");
  //   if (storedUserNumber) {
  //     setUserNumber(storedUserNumber);
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("number", number);
    console.log("policeReport:", policeReport);
    console.log("affidavit:", affidavit);
    console.log("securityReport:", securityReport);

    if (
      !policeReport ||
      !affidavit ||
      !securityReport ||
      !number
    ) {
      alert("Upload all required documents and provide your name.");
      return;
    }

    const formData = new FormData();
    formData.append("number", number);
    formData.append("policeReport", policeReport);
    formData.append("affidavit", affidavit);
    formData.append("securityReport", securityReport);
    // formData.append("userNumber", userNumber);

    try {
      const response = await fetch("http://localhost:5000/upload/documents", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Documents uploaded successfully");
      } else {
        alert("Failed to upload documents");
      }
    } catch (error) {
      console.error("Error uploading documents: ", error);
      alert("An error occurred during the upload. Please try again.");
    }
  };
  
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex justify-left items-center  gap-48">
        <img src={Logo} alt="" className="ml-24 w-[7rem]" />
        <p className="text-center text-[1.8em] items-center justify-center">
          University of Ibadan ID card management service
        </p>
      </div>
      <div className="rounded-xl bg-white ml-32 mr-32 h-auto w-auto shadow-lg">
        <div className="flex justify-center items-center border-solid border-b-4 mt-20 border-gray-400">
          <p className="mt-20">
            <b className="mr-[22rem] text-[2.5rem] mb-4 font-bold">
              Upload Documents
            </b>
          </p>
          <img
            src={Close}
            alt="Close"
            className="w-12 h-full mt-14 ml-[15rem]"
          />
        </div>
        <div className="grid grid-cols-2 gap-[25rem] mt-12">
          <div className="grid grid-cols-1 grid-rows-4">
            <h1 className="ml-16 font-bold text-[1.12rem]">
              Upload the following documents
            </h1>
            <ul className="list-disc ml-20 -mt-12">
              <li>Police report</li>
              <li>Affidavit</li>
              <li>UI security report</li>
            </ul>
          </div>
          <div className="flex mr-12 mb-20">
            <form onSubmit={handleSubmit}>
              {/* ... form labels and layout */}
              <b className="flex text-center text-[1.12rem] justify-center items-center">
                Uploaded documents
              </b>
              <div className="grid grid-rows-3 mr-10 mt-4">
                <input
                  type="text"
                  placeholder="Enter your staff or student number."
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  className="border-2 border-solid border-gray-400 justify-center pt-4 pb-4 mb-6 items-center text-center px-1 h-[4rem] rounded-md"
                />
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={handleFileChange}
                  className="border-2 border-solid border-gray-400 justify-center pt-4 pb-4 mb-6 items-center text-center px-1 h-[4rem] rounded-md"
                />
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={handleFileChange}
                  className="border-2 border-solid border-gray-400 justify-center pt-4 pb-4 mb-6 items-center text-center px-1 h-[4rem] rounded-md"
                />
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={handleFileChange}
                  className="border-2 border-solid border-gray-400 justify-center pt-4 pb-4 mb-6 items-center text-center px-1 h-[4rem] rounded-md"
                />
                <br />
              </div>
              <button
                type="submit"
                className="flex bg-blue-500 rounded-md text-center justify-center items-center text-[1.3rem] w-[7rem] h-[2.7rem] "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardApply;
