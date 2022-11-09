import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Covid19 from "./pages/Covid19";
import Weather from "./pages/Weather";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);
  return (
    <>
      {!isOnline && (
        <div className="d-flex justify-content-center bg-danger text-white position-absolute w-100">
          <h6>
            Internet kamu sedang offline, segera online untuk mendapatkan akses
            penuh
          </h6>
        </div>
      )}

      <BrowserRouter>
        <Suspense
          fallback={
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="text-primary"> Loading . . .</h3>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" index element={<Weather />} />
            <Route path="/covid" index element={<Covid19 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
