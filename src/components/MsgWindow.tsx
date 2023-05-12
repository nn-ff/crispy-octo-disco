import React, { useEffect, useState } from 'react';
import { ContactMenu } from './contactMenu/ContactMenu';
import { Chat } from './chat/Chat';
import { Login } from './login/Login';

export interface Inumbers {
  id: number;
  value: string;
}
interface Imsg {
  value: string;
  self: boolean;
}

export interface ImessageList {
  sender: string;
  messages: Imsg[];
}
export interface IloginInfo {
  idInstance?: string;
  apiTokenInstance?: string;
}
export const MsgWindow = () => {
  const [numbers, setNumbers] = useState<Inumbers[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [addButton, setAddButton] = useState<boolean>(false);
  const [activeContact, setActiveContact] = useState<Inumbers | null>(null);
  const [messageValue, setMessageValue] = useState<string>('');
  const [messageList, setMessageList] = useState<ImessageList[]>([]);
  const [loginInfo, setLoginInfo] = useState<IloginInfo | null>(null);
  const [auth, setAuth] = useState<boolean>(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onChangeMsgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };
  const addContact = () => {
    setAddButton(!addButton);
    setInputValue('');
    setNumbers([...numbers, { id: Date.now(), value: inputValue }]);
    setMessageList((prev) => [...prev, { sender: inputValue, messages: [] }]);
  };
  const onSubmitHandle = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    const currentSender = messageList.find((obj) => obj.sender === activeContact?.value);
    if (currentSender) {
      setMessageList((prev) =>
        prev.map((item) => {
          if (item.sender === currentSender.sender) {
            return {
              ...item,
              messages: [...item.messages, { self: true, value: messageValue }],
            };
          }
          return item;
        }),
      );
    }
    const res = await fetch(
      `https://api.green-api.com/waInstance${loginInfo?.idInstance}/SendMessage/${loginInfo?.apiTokenInstance}`,
      {
        method: 'POST',
        body: JSON.stringify({
          chatId: activeContact?.value + '@c.us',
          message: messageValue,
        }),
      },
    );
    setMessageValue('');
  };

  return (
    <>
      {auth ? (
        <>
          <ContactMenu
            addButton={addButton}
            setAddButton={setAddButton}
            onChangeInput={onChangeInput}
            inputValue={inputValue}
            addContact={addContact}
            numbers={numbers}
            setActiveContact={setActiveContact}
            activeContact={activeContact}
          />
          <Chat
            setNumbers={setNumbers}
            activeContact={activeContact}
            messageList={messageList}
            setMessageList={setMessageList}
            onSubmitHandle={onSubmitHandle}
            onChangeMsgInput={onChangeMsgInput}
            messageValue={messageValue}
            numbers={numbers}
            loginInfo={loginInfo}
          />
        </>
      ) : (
        <Login setLoginInfo={setLoginInfo} loginInfo={loginInfo} setAuth={setAuth} />
      )}
    </>
  );
};
