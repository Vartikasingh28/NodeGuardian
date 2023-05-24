import React from "react";
import app_config from "../../config";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Feedback = () => {
    const { themeColor, title } = app_config;
    const url = app_config.apiUrl;
    const navigate = useNavigate();

    const feedbackForm = useFormik({
        initialValues: {
            rating: "",
            feedback: "",

        },
        onSubmit: async (values) => {
            console.log(values);
            const res = await fetch(`${url}/feedback/add`, {
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
            <div className="mx-0 mx-sm-auto">
                <div className="card">
                    <div className="card-header bg-primary">
                        <h5 className="card-title text-white mt-2" id="exampleModalLabel">
                            Feedback request
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div className="text-center">
                            <i className="far fa-file-alt fa-4x mb-3 text-primary" />
                            <p>
                                <strong>Your opinion matters</strong>
                            </p>
                            <p>
                                Have some ideas how to improve our product?
                                <strong>Give us your feedback.</strong>
                            </p>
                        </div>
                        <hr />
                        <form className="px-4" action="" onSubmit={feedbackForm.handleSubmit}>
                            <p className="text-center">
                                <strong>Your rating:</strong>
                            </p>

                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="rating"
                                    id="verygood"
                                    value='veryGood'
                                    onChange={feedbackForm.handleChange}
                                />
                                <label className="form-check-label" htmlFor="radio3Example1">
                                    Very good
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="rating"
                                    id="good"
                                    value='good'
                                    onChange={feedbackForm.handleChange} />
                                <label className="form-check-label" htmlFor="radio3Example2">
                                    Good
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="rating"
                                    id="medicore"
                                    value='medicore'
                                    onChange={feedbackForm.handleChange}
                                />
                                <label className="form-check-label" htmlFor="radio3Example3">
                                    Medicore
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="rating"
                                    id="bad"
                                    value='bad'
                                    onChange={feedbackForm.handleChange}
                                />
                                <label className="form-check-label" htmlFor="radio3Example4">
                                    Bad
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="rating"
                                    id="verybad"
                                    value='verybad'
                                    onChange={feedbackForm.handleChange}
                                />
                                <label className="form-check-label" htmlFor="radio3Example5">
                                    Very bad
                                </label>
                            </div>
                            <p className="text-center">
                                <strong>What could we improve?</strong>
                            </p>
                            {/* Message input */}
                            <div className="form-outline mb-4">
                                <textarea
                                    className="form-control"
                                    id="feedback"
                                    rows={4}
                                    defaultValue={""}
                                    value={feedbackForm.values.feedback}
                                    onChange={feedbackForm.handleChange}
                                />
                                <label className="form-label" htmlFor="form4Example3">
                                    Your feedback
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="card-footer text-end">

                    </div>
                </div>
            </div>
        </>
    );
};
export default Feedback;
