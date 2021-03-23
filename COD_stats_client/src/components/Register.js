import React, { useState } from "react";
import styles from "../styles/Register.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../config";
import { login } from '../utils';
import axios from "axios";


const Register = () => {

  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();


  const onSubmit = async (data, e) => {
    setMessage({
      data: "Registration is in progress...",
      type: "alert-warning",
    });

    var email = data.email;
    var password = data.password;
    axios.post(`http://localhost:8080/auth/signup`, { email, password })
      .then((res) => res)
      .then(({ error, data }) => {
        setMessage({
          data: error || "Registered successfully",
          type: error ? "alert-danger" : "alert-success",
        });

        !error &&
          setTimeout(() => {
            console.log(data);
            localStorage.setItem("access_token", data.access_token);
            login();
            history.push("/dashboard/cold_war");
          }, 3000);

        !error && e.target.reset();
      });

    // .then((response) => {
    //   if (response.data.access_token) {
    //     localStorage.setItem("user", JSON.stringify({...response.data.user, access_token: response.data.access_token}));
    //   }
    // });

    // await fetch(`http://localhost:8080/auth/signup`, {
    //   method: "POST",
    //   body: body
    // })
    //   .then((res) => res.json())
    //   .then(({ error, data }) => {
    //     setMessage({
    //       data: error || "Registered successfully",
    //       type: error ? "alert-danger" : "alert-success",
    //     });

    //     !error &&
    //       setTimeout(() => {
    //         console.log(data);
    //         localStorage.setItem("access_token", data.access_token);
    //         login();
    //         history.push("/dashboard/cold_war");
    //       }, 3000);

    //     !error && e.target.reset();
    //   });
  };

  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.registrationFormContainer}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <legend
            className={`${styles.registrationFormLegend} border rounded p-1 text-center`}
          >
            Registration Form (use your activion's id)
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForEmail">Email address</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                name="email"
                type="email"
                className="form-control"
                aria-describedby="Enter email address"
                placeholder="Enter email address"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid email address",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {/**
               * we provide validation configuration for email field above
               * error message are displayed with code below
               */}
              {errors.email && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <button className="btn btn-link">
                <Link to="/login">Cancel</Link>
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Register;