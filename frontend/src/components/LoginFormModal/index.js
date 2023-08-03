import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true)
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) {
      setDisabled(false)
    } else {
      setDisabled(true)}
  }, [credential, password])
  const loginDemo = () => {
    dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
    .then(closeModal)
  }
  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="logIn">Log In</h1>
        <label className="text-input">
          {/* Username or Email */}
          <input
          className="input credentials"
          placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="text-input">
          {/* Password */}
          <input
           className="input password"
           placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button className={disabled ? "submit-button-inactive" : "submit-button-login"} type="submit" disabled={disabled}>Log In</button>
        <button className="demo-button" onClick={loginDemo}>DemoUser Login</button>
      </form>
    </>
  );
}
export default LoginFormModal;
