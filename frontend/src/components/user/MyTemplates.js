import React, { useEffect, useState } from "react";
import app_config from "../../config";
import { toast } from "react-hot-toast";

const MyTemplates = () => {
  const [codeList, setCodeList] = useState([]);
  const { apiUrl } = app_config;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(false);

  const getCodeList = async () => {
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/code/getbyuser/${currentUser._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    const data = (await response.json()).result;
    console.log(data);
    if (response.status === 200) {
      setCodeList(data);
      setLoading(false);
    }
  };

  const deleteCode = async (id) => {
    const response = await fetch(`${apiUrl}/code/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (response.status === 200) {
      toast.success("Boilerplate Code deleted successfully");
      getCodeList();
    }
  };


  useEffect(() => {
    getCodeList();
  }, []);

  const codeListDisplay = () => {
    if (!loading) {
      return codeList.map((code, index) => (
        <div className="row justify-content-center mb-3">
          <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                      <img
                        src="https://as1.ftcdn.net/jpg/05/31/71/02/220_F_531710260_ByieqNe7Ut6QBHgIR7xgdsxH7gICrHr1.jpg"
                        className="w-100"
                        alt=""
                      />
                      <a href="#!">
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(253, 253, 253, 0.15)",
                            }}
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <h5>{code.title}</h5>
                    
                    
                    <div className="mb-2 text-muted small">
                      <span>Unique design</span>
                      <span className="text-primary"> • </span>
                      <span>For men</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Casual
                        <br />
                      </span>
                    </div>
                    <p className="text-truncate mb-4 mb-md-0">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    
                    
                    <div className="d-flex flex-column mt-4">
                      <a className="btn btn-primary btn-sm" type="button" href=" ">
                        <i class="fa fa-cloud-download" aria-hidden="true"></i> Download
                      </a>
                      <button
                        className="btn btn-outline-danger btn-sm mt-2"
                        type="button"
                        onClick={() => deleteCode(code._id)}
                      >
                        <i class="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <p className="display-4">My Templates</p>
          </div>
          <div className="card-body">{codeListDisplay()}</div>
        </div>
      </div>
    </div>
  );
};

export default MyTemplates;
