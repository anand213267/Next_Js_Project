"use client";

import { createContext, useState } from 'react';
const colorObj = {
    "bgColor": "bg-white",
    "txtColor": "text-black",
    "btnText": "black"
};



export const ColorContext = createContext(colorObj);

export default function ColorContextProvider({ children }) {
    const [bgColor, setBgColor] = useState(colorObj.bgColor);
    const [txtColor, setTxtColor] = useState(colorObj.txtColor);
    const [btnText, setBtnText] = useState(colorObj.btnText);
    const toggleColor = () => {
        setBgColor((prevColor) => prevColor === "bg-white" ? "bg-black" : "bg-white");
        setTxtColor((prevColor) => prevColor === "text-black" ? "text-white" : "text-black");
        setBtnText((prevBtnText) => prevBtnText === "black" ? "white" : "black");
    }
    return (
        <ColorContext.Provider value={{ bgColor, txtColor, btnText, toggleColor }}>
            {children}
        </ColorContext.Provider>
    )
}