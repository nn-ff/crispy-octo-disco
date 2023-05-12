import React from 'react';
import { IloginInfo, ImessageList, Inumbers } from '../MsgWindow';
import { Messages } from './messages/Messages';

interface ChatProps {
  activeContact: Inumbers | null;
  messageList: ImessageList[];
  setMessageList: (value: React.SetStateAction<ImessageList[]>) => void;
  onSubmitHandle: (e?: React.FormEvent<HTMLFormElement>) => Promise<void>;
  messageValue: string;
  onChangeMsgInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  numbers: Inumbers[];
  setNumbers: (value: React.SetStateAction<Inumbers[]>) => void;
  loginInfo: IloginInfo | null;
}
export const Chat: React.FC<ChatProps> = ({
  activeContact,
  messageList,
  onSubmitHandle,
  messageValue,
  onChangeMsgInput,
  numbers,
  setNumbers,
  setMessageList,
  loginInfo,
}) => {
  if (loginInfo === null) {
    return null;
  }
  return (
    <div className="msg_right">
      <div className="msg_right--backasset"></div>
      <div className="right_header">
        <div className="right-current">{activeContact?.value}</div>
      </div>
      <div className="right_content">
        <Messages
          messageList={messageList}
          setMessageList={setMessageList}
          activeContact={activeContact}
          numbers={numbers}
          setNumbers={setNumbers}
          loginInfo={loginInfo}
        />
      </div>
      <div className="right_footer">
        <form className="footer-form" onSubmit={onSubmitHandle}>
          <input
            className="form-msginput"
            type="text"
            placeholder="msg..."
            value={messageValue}
            onChange={onChangeMsgInput}
          />
          <svg
            className="form-svg"
            onClick={() => onSubmitHandle()}
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24">
            <path
              fill="currentColor"
              d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
          </svg>
        </form>
      </div>
    </div>
  );
};
