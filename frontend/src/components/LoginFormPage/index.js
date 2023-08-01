import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect} from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  //Demo login function
  const demoUserButton = (e) => {
    setCredential('Demo-lition');
    setPassword('password');
  }

  // //demo user usee effect handling
  // useEffect(() => {
  //   const errorList = {};
  //   if (credential.length < 1) {
  //     errorList.credential = 'Username is required';
  //   }
  //   if (!password.length) {
  //     errorList.password = 'Password is required';
  //   }
  //   setErrors(errorList);
  // }, [credential, password]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button>
      <div>
        <div className="login-button-div">
         <button className='login-button demo-login-button' type="submit" onClick={demoUserButton}>Demo User Log In</button>
        </div>
      </div>
      </form>
    </>
  );
}

export default LoginFormPage;
