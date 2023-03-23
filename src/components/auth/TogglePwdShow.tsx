import React from 'react';
import { BiHide, BiShow } from "react-icons/bi";

type ToggleShowPwd = {
    passwordVisibility: boolean,
}

export const TogglePwdShow = ({ passwordVisibility }: ToggleShowPwd) => {
    return (
        <>
            {passwordVisibility
                ? <div className="show">  <BiShow /> </div>
                : <div className="hide">  <BiHide /> </div>
            }
        </>
    )
}
