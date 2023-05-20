import { useFormik } from "formik";
import React from "react";
import app_config from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const url = app_config.apiUrl;
  const navigate = useNavigate();

  const loginform = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await fetch(`${url}/user/auth`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 200) {
        const data = (await res.json()).result;
        // console.log("Login Successful");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Successful!!",
        });
        if (data.role === "admin") {
          sessionStorage.setItem("admin", JSON.stringify(data));
          navigate("/admin/dashboard");
        } else {
          sessionStorage.setItem("user", JSON.stringify(data));
          navigate("/user/profile");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Login Failed!!",
        });
      }
    },
  });

  return (
    <div className="login-container">
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <div className="card text-black" style={{ borderRadius: 25 }}>
                    <div className="card-body p-md-5">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Log in
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={loginform.handleSubmit}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-envelope fa-lg me-3 fa-fw" /> */}
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              onChange={loginform.handleChange}
                              value={loginform.values.email}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-lock fa-lg me-3 fa-fw" /> */}
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              onChange={loginform.handleChange}
                              value={loginform.values.password}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            defaultValue=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img
                    src="/back_img.webp"
                    className="img-fluid"
                    alt="Sample"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
