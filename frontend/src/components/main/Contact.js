import React from "react";
import app_config from "../../config";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const { themeColor, title } = app_config;
    const url = app_config.apiUrl;
    const navigate = useNavigate();
  
    const contactform = useFormik({
      initialValues: {
        email: "",
        name: "",
        subject: "",
        message: ""
      },
      onSubmit: async (values) => {
        console.log(values);
        const res = await fetch(`${url}/contact/add`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res.status);
        if (res.status === 200) {
          const data = (await res.json()).result;
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Submitted",
          });
        //   if (data.role === "admin") {
        //     sessionStorage.setItem("admin", JSON.stringify(data));
        //     navigate("/admin/dashboard");
        //   } else {
        //     sessionStorage.setItem("user", JSON.stringify(data));
        //     navigate("/user/profile");
        //   }
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
  <>
  {/*Section: Contact v.2*/}
  <section className="mb-4">
    {/*Section heading*/}
    <h2 className="h1-responsive font-weight-bold text-center my-4">
      Contact us
    </h2>
    {/*Section description*/}
    <p className="text-center w-responsive mx-auto mb-5">
      Do you have any questions? Please do not hesitate to contact us directly.
      Our team will come back to you within a matter of hours to help you.
    </p>
    <div className="row">
      {/*Grid column*/}
      <div className="col-md-9 mb-md-0 mb-5">
        <form
        //   id="contact-form"
        //   name="contact-form"
        //   action="mail.php"
        //   method="POST"
        onSubmit={contactform.handleSubmit}
        >
          {/*Grid row*/}
          <div className="row">
            {/*Grid column*/}
            <div className="col-md-6">
              <div className="md-form mb-0">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={contactform.values.name}
                  onChange={contactform.handleChange}
                />
                <label htmlFor="name" className="">
                  Your name
                </label>
              </div>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-md-6">
              <div className="md-form mb-0">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={contactform.values.email}
                  onChange={contactform.handleChange}
                />
                <label htmlFor="email" className="">
                  Your email
                </label>
              </div>
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
          {/*Grid row*/}
          <div className="row">
            <div className="col-md-12">
              <div className="md-form mb-0">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  value={contactform.values.subject}
                  onChange={contactform.handleChange}
                />
                <label htmlFor="subject" className="">
                  Subject
                </label>
              </div>
            </div>
          </div>
          {/*Grid row*/}
          {/*Grid row*/}
          <div className="row">
            {/*Grid column*/}
            <div className="col-md-12">
              <div className="md-form">
                <textarea
                  type="text"
                  id="message"
                  name="message"
                  rows={4}
                  className="form-control md-textarea"
                  defaultValue={""}
                  value={contactform.values.message}
                  onChange={contactform.handleChange}
                />
                <label htmlFor="message">Your message</label>
              </div>
            </div>
          </div>
          {/*Grid row*/}
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
        <div className="text-center text-md-left">
        </div>
        <div className="status" />
      </div>
      {/*Grid column*/}
      {/*Grid column*/}
      <div className="col-md-3 text-center">
        <ul className="list-unstyled mb-0">
          <li>
            <i className="fas fa-map-marker-alt fa-2x" />
            <p>San Francisco, CA 94126, USA</p>
          </li>
          <li>
            <i className="fas fa-phone mt-4 fa-2x" />
            <p>+ 01 234 567 89</p>
          </li>
          <li>
            <i className="fas fa-envelope mt-4 fa-2x" />
            <p>contact@mdbootstrap.com</p>
          </li>
        </ul>
      </div>
      {/*Grid column*/}
    </div>
  </section>
  {/*Section: Contact v.2*/}
</>

   );
 };
 
 export default Contact;
