'use client';

import { inputSetter } from "@utils";
import onNewUser from "@actions/newUser";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addJwtToCookies, getJwtToken } from "@/src/lib/auth";
import UserAuthRequest from "@/src/lib/annotations/userAuthRequest";

export default function New() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showConfirmationError, setShowConfirmationError] = useState(false);
  const [showPasswordSecurityError, setShowPasswordSecurityError] = useState(false);
  const [userAuthRequest, setUserAuthRequest] = useState<UserAuthRequest>({
    pending: false,
    completed: false,
    err: undefined,
    jwt: undefined,
    code: 200
  });

  const areInputsValid = (): boolean => {
    const emailValid = email.length > 0;
    const passwordConfirmed = (password == passwordConfirmation);
    const passwordValid = password.length > 0;
    setShowEmailError(!emailValid);
    setShowConfirmationError(!passwordConfirmed);
    setShowPasswordSecurityError(!passwordValid);
    return passwordConfirmed && passwordValid && emailValid;
  };


  useEffect(() => {
    if (getJwtToken() != undefined) {
      router.replace('/tasks');
    }
    if (userAuthRequest.completed && userAuthRequest.err == undefined) {
      addJwtToCookies(userAuthRequest.jwt as string);
      router.replace('/tasks');
    }
  }, [userAuthRequest]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!areInputsValid()) {
      return;
    }
    setPassword("");
    setEmail("");
    setPasswordConfirmation("");
    onNewUser(email, password, setUserAuthRequest);
  };

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className="min-w-96">
        <h1 className="mb-4 w-full border-b-[0.2px] pb-2 text-3xl font-bold">
          New Account
        </h1>
        <form onSubmit={onSubmit}>
          <div className="label">
            <label className="label-text" htmlFor="email-input">Email</label>
          </div>
          <input
            type="text"
            value={email}
            id="email-input"
            placeholder="Email..."
            className={`${showEmailError ? 'border-red-500' : ""} input input-bordered w-full min-w-full`}
            onChange={inputSetter(setEmail)}
          />
          {(showEmailError) && (
            <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500"
            >Please enter in a valid email</span>
          )}
          <div className="label">
            <label className="label-text" htmlFor="password-input">Password</label>
          </div>
          <input
            type="password"
            id="password-input"
            placeholder="Password..."
            value={password}
            className={`${showPasswordSecurityError || showConfirmationError ? 'border-red-500' : ""} input input-bordered w-full min-w-full`}
            onChange={inputSetter(setPassword)}
          />
          {(showConfirmationError && !showPasswordSecurityError) && (
            <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500"
            >Passwords do not match</span>
          )}
          {showPasswordSecurityError && (
            <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500"
            >Please increase password length</span>
          )}
          <div className="label">
            <label className="label-text" htmlFor="password-confirmation-input">Confirm password</label>
          </div>
          <input
            type="password"
            id="password-confirmation-input"
            placeholder="Confirm password..."
            value={passwordConfirmation}
            className="input input-bordered w-full min-w-full"
            onChange={inputSetter(setPasswordConfirmation)}
          />
          <button type="submit" className="btn btn-s mt-6">Sign up</button>
        </form>
      </div>
    </div>
  );
}
