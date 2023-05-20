import React, { useState } from "react";
import app_config, { structureData } from "../../config";
import { toast } from "react-hot-toast";

const CodeGenerator = () => {
  const url = app_config.apiUrl;
  const [fileUrl, setFileUrl] = useState("");
  const selOptions = JSON.parse(sessionStorage.getItem("selOptions"));
  // console.log(selOptions);
  console.log(structureData[selOptions.main].files);
  const [dependencies, setDependencies] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [searchText, setSearchText] = useState('');
  const [libToDisplay, setLibToDisplay] = useState([]);

  // const generateBoilerplate = async () => {
  //   const res = await fetch(url + "/util/generateCode");
  //   console.log(res.status);
  //   const data = await res.json();
  //   console.log(data);
  //   setFileUrl(url + "/" + data.filename);
  // };

  const generateCodeFromData = async () => {
    const res = await fetch(url + "/util/generateCodeFromData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: structureData[selOptions.main].files,
        dependencies,
        name: "test",
        createdBy: currentUser._id,
      }),
    });
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setFileUrl(url + "/" + data.filename);
    toast.success("Boilerplate Generated Successfully");
  };

  const getFilesInHierarchy = (filesList) => {
    let files = {};
    filesList.forEach((obj) => {
      if (obj.path === "") {
        if (files.base.includes(obj.name)) return;
        files.base.push(obj.name);
      } else {
        if (files.includes(obj.path)) files.push(obj.path + "/" + obj.name);
      }
    });
    // console.log(files);
  };

  const getAllPaths = (filesList) => {
    let paths = [];
    filesList.forEach((obj) => {
      if (obj.path !== "") {
        if (!paths.includes(obj.path)) {
          paths.push(obj.path);
        }
      }
    });
    paths.push("");
    console.log(paths);
    return paths;
  };
  // getAllPaths(structureData[selOptions].files);

  // getFilesInHierarchy(structureData[selOptions].files);

  const projectDirectories = () => {
    console.log(structureData[selOptions.main].files);
    let paths = getAllPaths(structureData[selOptions.main].files);
    return paths.map((path) => {
      return (
        <div>
          {path && (
            <p className="h5">
              <i class="fa-solid fa-folder"></i> {path}
            </p>
          )}

          {structureData[selOptions.main].files.map((file) =>
            file.path === path ? (
              <p className="h5">
                {file.path !== "" && <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}
                <i class="fa-regular fa-file"></i> {file.name}
              </p>
            ) : null
          )}
        </div>
      );
    });
  };

  const addDependency = (dependency) => {
    setDependencies([...dependencies, dependency]);
  };

  const removeDependency = (dependency, index) => {
    const newDependencies = dependencies.filter((dep, i) => i !== index);
    setDependencies(newDependencies);
  };

  const showDependencies = (dependencies, action) => {
    return (
      <ul class="list-group">
        {dependencies.map((dependency, index) => (
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-2">
                <i className={dependency.icon}></i>
              </div>
              <div className="col-md-8">
                <h5>{dependency.package}</h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, fugiat!
                </p>
              </div>
              <div className="col-md-2">
                {action === "add" ? (
                  <button
                    className="btn btn-primary"
                    onClick={(e) => addDependency(dependency)}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => removeDependency(dependency, index)}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url("/back_img4.png")`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div
        className="modal fade modal-lg"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <input
                className="form-control"
                placeholder="🔍 Search Dependency"
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {showDependencies(structureData[selOptions.main].library, "add")}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="card">
          <div className="card-body p-5">
            <p className="display-4">
              <span className="fw-bold">NodeJS</span> Boilerplate Code Generator
            </p>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <div className="p-5">
                  <h3>Project Directories</h3>
                  <hr />
                  {projectDirectories()}
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-5">
                  <h3>Project Dependencies</h3>
                  <hr />
                  <button
                    className="btn btn-success my-3"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i class="fas fa-plus"></i>
                    Add Dependency
                  </button>

                  {showDependencies(dependencies, "remove")}
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="row">
              <div className="col-md-2">
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={generateCodeFromData}
                >
                  <i class="fa-solid fa-gear"></i>&nbsp; Generate
                </button>
              </div>
              {fileUrl && (
                <div className="col-md-2">
                  <a
                    className="btn btn-lg btn-outline-success w-100"
                    href={fileUrl}
                  >
                    <i class="fa-solid fa-cloud-arrow-down"></i>
                    &nbsp;Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;
