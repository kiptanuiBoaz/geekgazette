import React from 'react';
import { BsInfoCircle, BsCheck2Circle } from "react-icons/bs";
import { MsgTypes } from "../../types/auth-types/validationMsgTypes";

interface ValidationMsgTypes {
  identifier: string;
  msgsArray: {
    variable: boolean;
    p: string;
  }[]
}

export const ValidationMsgs = ({ identifier, msgsArray }: ValidationMsgTypes) => {
  return (
    <div className='validation'>
      < p className="identifier" >{identifier}:</p>
      {msgsArray.map(
        ({ variable, p }: MsgTypes) =>
          <p style={{ "color": variable ? "#4d7e3e" : "#9e9d9d" }}>
            {variable ? <BsCheck2Circle /> : <BsInfoCircle />}{" "}
            {p}
          </p>
      )}
    </div>
  )
}
