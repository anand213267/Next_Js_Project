"use client";

import { useContext, useState, useMemo, useRef, useEffect } from "react";
import { ColorContext } from "../context/ColorContext";
import Navbar from "../Navbar/page";

const arr = Array.from({ length: 10000 }, (_, i) => i + 1);
const Profile = () => {
    const { btnText, bgColor, txtColor, toggleColor } = useContext(ColorContext);
    const [count, setCount] = useState(0)
    const [value, setValue] = useState([])
    const [findText, setFindText] = useState("Not found")

    // const magic = useMemo(() => arr.find((item) => item == 450000), []);
    const magic = arr.find((item) => { item == 4500 });

    const c = useRef(0);

    const updateC = () => {
        c.current = c.current + 1;
        console.log("C is", c.current);
        // setCount(count + 1);
    }

    useEffect(() => {
        updateC();
    });

    return (
        <>
            {/* <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> */}
            <h1 className="bg-joy dark">This is profile</h1>
            <p>Value of c : {c.current}</p>
            <button onClick={() => updateC()}>Click to increment c</button>
            <h1>My magic Number is : {magic}</h1>
            <button onClick={() => setCount(count + 1)}>{count}</button>
            <button className={btnText === "black" ? `p-2 border ${txtColor}` : `p-2 border ${txtColor}`} onClick={toggleColor}>Change Background Color to {btnText} and Text color to <span className={txtColor}>{btnText == 'black' ? 'white' : 'black'}</span></button>
            {/* <div>
                <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-wrap">
                    {value.map((item, index) => (
                        <p className="flex" key={index}>{item}</p>
                    ))}
                </div>
            </div> */}
            {/* </main>
            </div> */}
        </>
    )
}

export default Profile;