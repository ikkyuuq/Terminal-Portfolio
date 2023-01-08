import { useEffect, useState } from 'react';
import './style.css';

export default function Navbar(props){
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(()=>{
            setTime(new Date().toLocaleTimeString());
        }, 1000)
        return () => clearInterval(interval);
    }, []);

    return(
        <nav className="nav-fixed flex bg-white w-full ld-30px rf-30px items-center justify-between">
            <div className="left-bar flex items-center">
                <img src="/mac-logo.png"></img>
                <h3 className="terminal-toggle" onClick={props.toggleVisiblity}>Terminal</h3>
            </div>
            <div className="right-bar flex items-center">
                <h3>{time}</h3>
            </div>
        </nav>
    )
}