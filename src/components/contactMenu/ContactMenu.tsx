import React from 'react';
import { Inumbers } from '../MsgWindow';

interface ContactMenuProps {
  addButton: boolean;
  setAddButton: (value: React.SetStateAction<boolean>) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  addContact: () => void;
  numbers: Inumbers[];
  setActiveContact: (value: React.SetStateAction<Inumbers | null>) => void;
  activeContact: Inumbers | null;
}
export const ContactMenu: React.FC<ContactMenuProps> = ({
  addButton,
  setAddButton,
  onChangeInput,
  inputValue,
  addContact,
  numbers,
  setActiveContact,
  activeContact,
}) => {
  return (
    <div className="msg_left">
      <div className="left_header"></div>
      <div className="left__contact-menu">
        {!addButton ? (
          <button onClick={() => setAddButton(!addButton)} className="left__contact-button">
            add
          </button>
        ) : (
          <div className="left__contact-add">
            <input
              className="left__contact-input"
              onChange={onChangeInput}
              value={inputValue}
              placeholder="number..."
            />
            <button onClick={addContact} className="left__contact-button">
              +
            </button>
          </div>
        )}
        {numbers.map((obj) => {
          return (
            <div
              onClick={() => setActiveContact({ id: obj.id, value: obj.value })}
              className={`contact ${activeContact?.id === obj.id ? 'active' : ''}`}
              key={obj.id}>
              <div className="contact_number">{obj.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
