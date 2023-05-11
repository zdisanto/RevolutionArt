import React from "react";

const ShowMessage = ({ show, setShow }) => {

  return (
    <div
      className={`fixed top-0 left-0 min-w-[100vw] min-h-[100vh] z-10 bg-[#160202a8] flex items-center justify-center ${
        show ? "block" : "hidden"
      } `}
    >
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white z-20">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <img src="/images/confirmation.jpeg" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            You are now unsubscribed!
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              We are sorry to see you go and hope to see you back soon in the
              future!
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => setShow(!show)}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMessage;
