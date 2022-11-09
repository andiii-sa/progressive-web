import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";

function Covid19() {
  const [data, setData] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [err, setErr] = useState(null);
  const [step, setStep] = useState(0);

  const getData = useCallback(async () => {
    setErr(null);
    setIsLoad(true);
    const options = {
      method: "GET",
      url: "https://covid-193.p.rapidapi.com/statistics",
      headers: {
        "X-RapidAPI-Key": "3108b4f859mshb101de5913b125cp133c48jsnf01dd44bc042",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
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
        if (err?.code === "ERR_NETWORK") {
          setErr("Silahkan sambungkan ke internet, anda dalam mode offline");
        } else {
          setErr(err?.response?.data?.error?.message);
        }
        console.log("herrrrr");
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const listDataCovid = useMemo(() => {
    let temp = data?.response ?? [];
    let sliceTemp = temp?.slice(0 + step * 4, 4 + step * 4);
    return sliceTemp;
  }, [data, step]);

  console.log("step", step);
  console.log(
    "data?.response?.length / 4",
    Math.floor(data?.response?.length / 4)
  );

  return (
    <>
      <div className="App">
        <div className="d-flex flex-column justify-content-center align-items-center bg-dark min-vh-100">
          <div className="container">
            <h3 className="text-white">Search Covid19</h3>
            <h3 className="text-white">{`Total data : ${
              data?.results ?? "waiting api"
            }`}</h3>
            <div className="col-12 mt-4">
              {isLoad ? (
                <div className="p text-white">IS LOAD CO</div>
              ) : data ? (
                <>
                  <div className="d-flex flex-wrap justify-content-center">
                    {listDataCovid?.map((item, idx) => (
                      <div key={idx} className="card m-3">
                        <div className="card-body text-start">
                          <div>
                            <span>Continent : </span>
                            <span>{item?.continent ?? "-"}</span>
                          </div>
                          <div>
                            <span>Country : </span>
                            <span>{item?.country ?? "-"}</span>
                          </div>
                          <div>
                            <span>Population : </span>
                            <span>{item?.population ?? "-"}</span>
                          </div>
                          <h5 className="text-primary mt-2">Cases</h5>
                          <div>
                            <span>New : </span>
                            <span>{item?.cases?.new ?? "-"}</span>
                          </div>
                          <div>
                            <span>Active : </span>
                            <span>{item?.cases?.active ?? "-"}</span>
                          </div>
                          <div>
                            <span>Recovered : </span>
                            <span>{item?.cases?.recovered ?? "-"}</span>
                          </div>
                          <div>
                            <span>Total Cases : </span>
                            <span>{item?.cases?.total ?? "-"}</span>
                          </div>
                          <h5 className="text-primary mt-2">Deaths</h5>
                          <div>
                            <span>New : </span>
                            <span>{item?.deaths?.new ?? "-"}</span>
                          </div>
                          <div>
                            <span>Total Death : </span>
                            <span>{item?.deaths?.total ?? "-"}</span>
                          </div>
                          <h5 className="text-info mt-2">{`Day : ${
                            item?.day ?? "-"
                          }`}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-wrap justify-content-center">
                    {step > 0 && (
                      <button
                        className="btn btn-danger mx-1"
                        onClick={(e) => {
                          e.preventDefault();
                          setStep(step - 1);
                        }}
                      >
                        Sebelumnya
                      </button>
                    )}
                    {Math.floor(data?.response?.length / 4) > step && (
                      <button
                        className="btn btn-primary mx-1"
                        onClick={(e) => {
                          e.preventDefault();
                          setStep(step + 1);
                        }}
                      >
                        Selanjutnya
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="p text-white">{err}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Covid19;
