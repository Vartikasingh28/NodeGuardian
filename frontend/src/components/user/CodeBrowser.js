import React, { useState } from "react";
import app_config, { structureData } from "../../config";
import "./codebrowser.css";
import { useNavigate } from "react-router-dom";
import { Tilt } from "react-tilt";

const tiltOptions = {
  max: 40,
  speed: 2000,
  scale: 1.1,
  transition: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const CodeBrowser = () => {
  const [selOptions, setSelOptions] = useState([]);
  const { options, apiUrl } = app_config;
  // console.log(structureData[options.webApp.fullstack.mern.frontend]);
  const navigate = useNavigate();

  const getSelectedObject = (givenOptions) => {
    if (!givenOptions) givenOptions = selOptions;
    let selObj = options;
    // console.log(options);
    // console.log(givenOptions);
    givenOptions.forEach((opt) => {
      selObj = selObj[opt];
    });
    // console.log(selObj);
    return selObj;
  };

  const handleOptionClick = (option) => {
    setSelOptions([...selOptions, option]);
    console.log(selOptions);
  };

  const getOptionData = () => {
    let data = {};
    selOptions.forEach((opt) => {
      data = { ...data, ...options[opt] };
    });
    console.log(data);
    return data;
  };

  const navigatetoCodeGenerator = (opt) => {
    let data = getSelectedObject([...selOptions, opt]);
    console.log(data);
    // return;
    // handleOptionClick(opt);
    sessionStorage.setItem(
      "selOptions",
      JSON.stringify(data)
    );
    navigate("/user/generator");
  };

  const displayOptions = (options) => {
    if (selOptions.length === 0) {
      return Object.keys(options).map((objKey, index) => (
        <div className="col-md-3 my-4" key={index}>
          <Tilt options={tiltOptions}>
            <div className="card">
              <div className="card-body">
                <img
                  className="card-img-top"
                  src={`/${objKey.toLowerCase()}.png`}
                  alt=""
                />
                <h5 className="card-title text-center h3 mt-3">
                  {objKey[0].toUpperCase() + objKey.slice(1)}
                </h5>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-outline-success w-100"
                  onClick={(e) => handleOptionClick(objKey)}
                >
                  View this Category
                </button>
                {getSelectedObject([...selOptions, objKey]).hasOwnProperty(
                  "generate"
                ) && (
                  <button
                    className="btn btn-primary float-end w-100"
                    onClick={(e) => navigatetoCodeGenerator(objKey)}
                  >
                    Generate Boilerplate
                  </button>
                )}
              </div>
            </div>
          </Tilt>
        </div>
      ));
    } else {
      const selObj = getSelectedObject();
      return Object.keys(selObj).map((objKey, index) => (
        <div className="col-md-3 my-4" key={index}>
          <Tilt options={tiltOptions}>
            <div className="card">
              <div className="card-body">
                <img
                  className="card-img-top"
                  src={`/${objKey.toLowerCase()}.png`}
                  alt=""
                />
                <h5 className="card-title text-center h3 mt-3">
                  {objKey[0].toUpperCase() + objKey.slice(1)}
                </h5>
              </div>
              <div className="card-footer">
                {getSelectedObject([...selOptions, objKey]).hasOwnProperty(
                  "generate"
                ) ? (
                  <button
                    className="btn btn-primary float-end w-100"
                    onClick={(e) => navigatetoCodeGenerator(objKey)}
                  >
                    Generate Boilerplate
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success w-100"
                    onClick={(e) => handleOptionClick(objKey)}
                  >
                    View this Category
                  </button>
                )}
              </div>
            </div>
          </Tilt>
        </div>
      ));
    }
  };

  return (
    <div className="vh-100 browse-container">
      <div className="container light-glassy-effect p-5">
        <h1 className="display-3">Browser Different NodeJS applications</h1>
        <h3 className="mb-5">Start by Exploring an application Type</h3>
        <button
          className="btn btn-primary"
          onClick={(e) => setSelOptions(selOptions.slice(0, -1))}
        > <i class="fas fa-arrow-left    "></i>
          &nbsp;Back
        </button>
        <div className="row">{displayOptions(options)}</div>
      </div>
    </div>
  );
};

export default CodeBrowser;
