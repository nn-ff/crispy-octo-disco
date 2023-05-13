import React, { useState } from 'react';
import { IloginInfo } from '../MsgWindow';

interface LoginProps {
  setLoginInfo: (value: React.SetStateAction<IloginInfo | null>) => void;
  loginInfo: IloginInfo | null;
  setAuth: (value: React.SetStateAction<boolean>) => void;
}
export const Login: React.FC<LoginProps> = ({ setLoginInfo, loginInfo, setAuth }) => {
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const onChangeidInstance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev) => ({ ...prev, idInstance: e.target.value }));
  };
  const onChangeapiTokenInstance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev) => ({ ...prev, apiTokenInstance: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      setLoginLoading(true);
      const res = await fetch(
        `https://api.green-api.com/waInstance${loginInfo?.idInstance}/getStatusInstance/${loginInfo?.apiTokenInstance}`,
      );

      if (res.ok) {
        setAuth(true);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
    } finally {
      setLoginLoading(false);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-menu">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <label className="login-title">
            idInstance
            <input
              className="login-input"
              placeholder="..."
              value={loginInfo?.idInstance ? loginInfo.idInstance : ''}
              onChange={onChangeidInstance}
            />
          </label>
          <label className="login-title">
            apiTokenInstance
            <input
              className="login-input"
              placeholder="..."
              value={loginInfo?.apiTokenInstance ? loginInfo.apiTokenInstance : ''}
              onChange={onChangeapiTokenInstance}
            />
          </label>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <div className="login-process">
            {loginError && <div className="login-error">Invalid login information.</div>}
            {loginLoading && <div className="login-loading">Loading...</div>}
          </div>
        </form>
      </div>
    </div>
  );
};
