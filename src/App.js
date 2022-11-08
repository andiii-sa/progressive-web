import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Input } from "reactstrap";
import "./App.css";

function App() {
  const [key, setKey] = useState(null);
  const [data, setData] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [err, setErr] = useState(null);

  const handleFetch = async (e) => {
    console.log("key", key);
    setErr(null);
    e.preventDefault();
    setIsLoad(true);
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: key, days: "3" },
      headers: {
        "X-RapidAPI-Key": "3108b4f859mshb101de5913b125cp133c48jsnf01dd44bc042",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then((res) => {
        setData(res?.data);
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("err", err);
        setErr(err?.response?.data?.error?.message);
      })
      .finally(() => {
        setKey(null);
        setIsLoad(false);
      });
  };

  return (
    <div className="App">
      <div className="d-flex flex-column justify-content-center align-items-center bg-dark min-vh-100">
        <h3 className="text-white">Loading . . .</h3>
        <div className="col-4">
          <form>
            <Input name="key" onChange={(e) => setKey(e?.target?.value)} />
            <button
              type="submit"
              className="btn btn-info btn-sm mt-2"
              onClick={handleFetch}
            >
              sub
            </button>
          </form>
        </div>
        <div className="col-4 mt-4">
          {isLoad ? (
            <div className="h3 text-white">IS LOAD CO</div>
          ) : err ? (
            <div className="h3 text-white">{err}</div>
          ) : (
            <div className="h3 text-white">{JSON.stringify(data)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
