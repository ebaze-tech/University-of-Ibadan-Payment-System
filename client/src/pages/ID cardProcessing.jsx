import React from "react";
import { Link } from "react-router-dom";
import background from "../assets/background.png";
import Logo from "../assets/ui_logo.svg";
import Apply from "../assets/AddUserMale.png";
import Forward from "../assets/ExpandArrow.png";
import Replace from "../assets/CardExchange.png";
import Upgrade from "../assets/ChangeUser.png";
import Return from "../assets/Return.svg";
const cardProcessing = () => {
  return (
    <div className="flex bg-white w-full h-full gap-60 justify-center items-center overflow-hidden">
      <div className="mt-10 mb-20">
        <div className="flex justify-center gap-24 items-center">
          <img src={Logo} alt="Logo" className="ml-[7rem] w-[6rem]" />
          <p className="text-center text-[1.3em] ">
            University of Ibadan ID card management service
          </p>
        </div>
        <div className="grid mt-[5rem]  ml-24">
          <p>
            <b className="text-[2rem]">How can we assist you?</b>
          </p>
          <button className="flex border-solid border-gray-300 border-2 h-24 gap-[6rem] justify-center items-center w-[40rem] text-[1.2rem] mt-16 rounded-[20px]">
            <img src={Apply} />
            <Link to="/apply">Apply for new ID card</Link>
            <img src={Forward} />
          </button>
          <button className="flex border-solid border-gray-300 border-2 h-24 gap-[5rem] justify-center items-center w-[40rem] text-[1.2rem] mt-16 rounded-[20px]">
            <img src={Upgrade} />
            <Link to="/upgrade">Upgrade existing ID card</Link>
            <img src={Forward} />
          </button>
          <button className="flex border-solid border-gray-300 border-2 h-24 gap-[5rem] justify-center items-center w-[40rem] text-[1.2rem] mt-16 rounded-[20px]">
            <img className="mr-[2rem]" src={Replace} />
            <Link to="/replace">Replace lost ID card</Link>
            <img src={Forward} />
          </button>
          <div className="flex ml-[10rem] mt-16">
            <Link to="/itemsPay">
              <img src={Return} alt="Return to itemsPay" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20 mb-12">
        <img src={background} alt="" className="h-[52rem] w-fit " />
      </div>
    </div>
  );
};

export default cardProcessing;
