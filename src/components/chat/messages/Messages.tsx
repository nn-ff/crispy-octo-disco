import React, { useEffect } from 'react';
import { IloginInfo, ImessageList, Inumbers } from '../../MsgWindow';

interface MessagesProps {
  activeContact: Inumbers | null;
  messageList: ImessageList[];
  setMessageList: (value: React.SetStateAction<ImessageList[]>) => void;
  numbers: Inumbers[];
  setNumbers: (value: React.SetStateAction<Inumbers[]>) => void;
  loginInfo: IloginInfo;
}
export const Messages: React.FC<MessagesProps> = ({
  activeContact,
  messageList,
  numbers,
  setNumbers,
  setMessageList,
  loginInfo,
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const sendMsg = async () => {
        const res = await fetch(
          `https://api.green-api.com/waInstance${loginInfo.idInstance}/ReceiveNotification/${loginInfo.apiTokenInstance}`,
        );
        const data = await res.json();
        if (data?.body?.messageData) {
          const textValue = data?.body?.messageData?.extendedTextMessageData?.text
            ? data.body.messageData.extendedTextMessageData.text
            : data.body.messageData.textMessageData.textMessage;
          if (numbers.some((obj) => data.body.senderData.sender.includes(obj.value))) {
            const currentSender = messageList.find(
              (obj) => obj.sender === data.body.senderData.sender.slice(0, 11),
            );
            if (currentSender) {
              setMessageList((prev) =>
                prev.map((item) => {
                  if (item.sender === currentSender.sender) {
                    return {
                      ...item,
                      messages: [
                        ...item.messages,
                        {
                          self: false,
                          value: textValue,
                        },
                      ],
                    };
                  }
                  return item;
                }),
              );
            }
          } else {
            setNumbers([
              ...numbers,
              { id: Date.now(), value: data.body.senderData.sender.slice(0, 11) },
            ]);
            setMessageList((prev) => [
              ...prev,
              {
                sender: data.body.senderData.sender.slice(0, 11),
                messages: [{ self: false, value: textValue }],
              },
            ]);
          }
        }
        if (data !== null) {
          const deleteres = await fetch(
            `https://api.green-api.com/waInstance${loginInfo.idInstance}/DeleteNotification/${loginInfo.apiTokenInstance}/${data.receiptId}`,
            {
              method: 'DELETE',
            },
          );
        }
      };
      sendMsg();
    }, 5100);
    return () => clearInterval(intervalId);
  }, [messageList, numbers]);

  return (
    <div className="content_wrapper">
      {messageList.map((obj) => {
        if (obj.sender === activeContact?.value) {
          const msges = obj.messages.map((msg, i) => {
            return (
              <div className={`message ${msg.self ? '' : 'message-receive'}`} key={i}>
                {msg.value}
              </div>
            );
          });
          return msges;
        } else {
          return null;
        }
      })}
    </div>
  );
};
