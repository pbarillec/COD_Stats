
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/Login.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../config";
<<<<<<< HEAD
<<<<<<< HEAD
import { login } from '../utils';
=======
import axios from "axios";
import API from "@callofduty/api";
import OAuth2Login from 'react-simple-oauth2-login';
>>>>>>> 85579ab... ADD- widgets
=======
import { login } from '../utils';
>>>>>>> 26aab66... ADD - navbar


const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();

  const onSubmit = async (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 26aab66... ADD - navbar
    await fetch(`https://localhost:8081/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(`username=${data.email}`, `password=${data.password}`)
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
        setMessage({
          data: error || "Logged in successfully, redirecting...",
          type: error ? "alert-danger" : "alert-success",
        });

        !error &&
          setTimeout(() => {
            localStorage.setItem("token", data.token);
            login();
            history.push("/dashboard/cold_war");
          }, 3000);

        !error && e.target.reset();
      });
<<<<<<< HEAD
=======
    // // Step 1: Instantiate the API
    // const CallOfDutyAPI = new API()
    // // Step 2: Login with email + password (top-level await as shown below may not be available in your environment, wrap as necessary)
    // const { xsrf, sso, atkn } = await CallOfDutyAPI.Authorize(data.email, data.password)
    // // Step 3: Update API instance and continue as an authenticated user
    // CallOfDutyAPI.UseTokens({ xsrf, sso, atkn })
    // // Step 4: Fetch the identity for this account to find username/platform for desired game
    // const { titleIdentities } = await CallOfDutyAPI.Identity()
    // // Step 5: Filter for game-specific profiles (we'll use MW and assume there is only one profile but multiple are supported)
    // const { username, platform } = titleIdentities.find(identity => identity.title === 'mw')
    // console.log("TEST");
    // console.log(xsrf);
    // console.log("username");
    // console.log(username);

    // var setCookie = require('set-cookie-parser');


    // const response = await fetch(`https://profile.callofduty.com/cod/login`, {
    //     method: "GET",
    // })

    // var combinedCookieHeader = response.headers.get('Set-Cookie');
    // var splitCookieHeaders = setCookie.splitCookiesString(combinedCookieHeader)
    // var cookies = setCookie.parse(splitCookieHeaders);

    // console.log(cookies); // should be an array of cookies

    // const response = await axios.get('https://profile.callofduty.com/cod/login')
    // .then(response => {
    //     console.log(response)
    // });
    // console.log(response.headers["Set-Cookie"]);
    // console.log(document.cookie);
    // const test = response.headers;
    // console.log(document.cookie);
    // console.log(response.headers);
    // await fetch(`https://profile.callofduty.com/do_login?new_SiteId=cod`, {
    // // fetch(`${config.baseUrl}/user/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Cookie" : "XSRF-TOKEN=M4Nx2PCh8ikrJdZOr3TTg4TbLDO3SFVKBThMdHqVucb_bljZ7qlTfbsyRgXGByGS"
    //   },
    //   body: JSON.stringify(`username=${data.email}`, `password=${data.password}`, `remember_me=true`, `_csrf=M4Nx2PCh8ikrJdZOr3TTg4TbLDO3SFVKBThMdHqVucb_bljZ7qlTfbsyRgXGByGS`)
    // //   JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then(({ error, data }) => {
    //     setMessage({
    //       data: error || "Logged in successfully, redirecting...",
    //       type: error ? "alert-danger" : "alert-success",
    //     });

    //     !error &&
    //       setTimeout(() => {
    //         localStorage.setItem("token", data.token);
    //         history.push("/dashboard");
    //       }, 3000);

    //     !error && e.target.reset();
    //   });
>>>>>>> 85579ab... ADD- widgets
=======
>>>>>>> 26aab66... ADD - navbar
  };

  return (
    <div
      className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={styles.loginFormContainer}>
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
            className={`${styles.loginFormLegend} border rounded p-1 text-center`}
          >
            Login with your Activision ID's
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
                })}
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>
<<<<<<< HEAD
<<<<<<< HEAD
            </div>
          </form>
        </fieldset>
=======

              <button className="btn btn-link ml-auto">
                <Link to="/register">New User</Link>
              </button>
            </div>
          </form>
        </fieldset>
        <OAuth2Login
              authorizationUrl="https://us.battle.net/oauth/authorize"
              responseType="code"
              clientId={process.env.REACT_APP_BATTLE_NET_CLIENT_ID}
              redirectUri={"http://localhost:8081/login"}
              onSuccess={(e) => {console.log(e)}}
              onFailure={(e) => {}}
              className="btn btn-primary btn-block btn-google">
                <span className="button-label">Sign up with Battle.net</span>
        </OAuth2Login>
>>>>>>> 85579ab... ADD- widgets
=======
            </div>
          </form>
        </fieldset>
>>>>>>> 26aab66... ADD - navbar
      </div>
    </div>
  );
};

export default Login;