import React, { useState } from "react";
import { Link } from "react-router-dom";
import UI_Logo from "../assets/ui_logo.svg";
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import person3 from "../assets/person3.png";

const App = () => {
  const [getStarted, setGetStarted] = useState(false);

  const handleGetStarted = () => {
    setGetStarted(!getStarted);
  };

  return (
    <div className="w-screen h-screen overflow-auto md:overflow-hidden 2xl:container 2xl:mx-auto flex md:flex-row flex-col items-center">
      {/* LHS */}
      <div className="md:w-1/2 w-full p-5 md:p-20 flex flex-col md:justify-center gap-10 h-full">
        {/* logo */}
        <div className="flex items-center gap-1">
          <img src={UI_Logo} alt="UI Logo" className="md:w-14 w-9" />
          <span className="italic font-bold text-lg md:text-2xl">UIPAY</span>
        </div>
        {/* cta */}
        <div className="flex flex-col gap-5">
          <span className="font-semibold text-2xl md:text-5xl md:leading-[3.8rem]">
            All university <span className="italic text-primary">payments {" "}</span>
            collected in one place
          </span>
          <span className="md:leading-loose md:text-base text-sm leading-loose font-light">
            Revolutionize Your Academic Financial Management: Seamlessly
            Centralize and Streamline All University Payments in a Single,
            User-Friendly Platform for an Enhanced Educational Financial
            Experience
          </span>
          <button
            className="bg-black text-white md:h-16 h-12 md:text-base text-sm font-medium rounded-xl"
            onClick={handleGetStarted}
          >
            {getStarted ? "Home" : "Get Started"}
          </button>
        </div>
      </div>
      {/* RHS */}
      {getStarted ? (
        <div className="md:w-1/2 w-full p-5 md:p-20 flex flex-col gap-5 h-full justify-center md:overflow-x-auto">
          {/* card */}
          <div className="flex justify-between gap-3 items-center w-full shadow-lg px-5 py-7 rounded-xl border border-neutral-100">
            <div className="flex items-center gap-2">
              <img src={UI_Logo} alt="UI Logo" className="md:w-14 w-10" />
              <span className="md:text-base text-sm font-medium">
                ITEMS Pay
              </span>
            </div>
            <Link
              to="/itemsPay"
              className="md:h-10 h-8 border border-black md:px-8 px-4 flex justify-center items-center rounded-xl hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
            >
              View
            </Link>
          </div>
          {/* card */}
          <div className="flex justify-between gap-3 items-center w-full shadow-lg px-5 py-7 rounded-xl border border-neutral-100">
            <div className="flex items-center gap-2">
              <img src={UI_Logo} alt="UI Logo" className="md:w-14 w-10" />
              <span className="md:text-base text-sm font-medium">
                Maintenance Payments
              </span>
            </div>
            <Link className="md:h-10 h-8 border border-black md:px-8 px-4 flex justify-center items-center rounded-xl hover:bg-black hover:text-white transition-all duration-200 ease-in-out">
              View
            </Link>
          </div>
          {/* card */}
          <div className="flex justify-between gap-3 items-center w-full shadow-lg px-5 py-7 rounded-xl border border-neutral-100">
            <div className="flex items-center gap-2">
              <img src={UI_Logo} alt="UI Logo" className="md:w-14 w-10" />
              <span className="md:text-base text-sm font-medium">
                Hospital and Clinical Payments
              </span>
            </div>
            <Link className="md:h-10 h-8 border border-black md:px-8 px-4 flex justify-center items-center rounded-xl hover:bg-black hover:text-white transition-all duration-200 ease-in-out">
              View
            </Link>
          </div>
          {/* card */}
          <div className="flex justify-between gap-3 items-center w-full shadow-lg px-5 py-7 rounded-xl border border-neutral-100">
            <div className="flex items-center gap-2">
              <img src={UI_Logo} alt="UI Logo" className="md:w-14 w-10" />
              <span className="md:text-base text-sm font-medium">
                Faculty Funds Pay
              </span>
            </div>
            <Link className="md:h-10 h-8 border border-black md:px-8 px-4 flex justify-center items-center rounded-xl hover:bg-black hover:text-white transition-all duration-200 ease-in-out">
              View
            </Link>
          </div>
        </div>
      ) : (
        <div className="md:w-1/2 w-full p-10 flex gap-5 h-full">
          <div className="h-full w-1/2 flex flex-col gap-5">
            <div className="w-full h-[60%] rounded-2xl overflow-hidden">
              <img
                src={person1}
                alt="Person 1"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="w-full h-[40%] bg-dark rounded-2xl overflow-hidden">
              <img
                src={person2}
                alt="Person 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="h-full w-1/2 rounded-2xl overflow-hidden">
            <img
              src={person3}
              alt="Person 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
