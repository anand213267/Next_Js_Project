"use client";

import { useEffect, useState } from "react";

const Task = () => {
    const [time, setTime] = useState(null);
    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000)

        return () => clearInterval(interval)
    }, [])

    if (!time) {
        return null;
    }

    return (
        <>
            <div className="text-right">
                <h1 className="text-2xl my-4">Time : {time.getHours().toString().padStart(2, '0')} : {time.getMinutes().toString().padStart(2, '0')} : {time.getSeconds().toString().padStart(2, '0')}</h1>
            </div>
        </>
    )
}

export default Task;