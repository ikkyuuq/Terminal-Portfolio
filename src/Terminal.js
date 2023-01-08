import './style.css';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Terminal(){
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState(inputRef.current);
    const [command, setCommand] = useState([]);
    const commandCalledRefs = useRef([]);
    const ref = useRef(null);

    const handleKeyPress = useCallback((e) => {
        const input = inputRef.current;
        if (e.key === 'Enter' && input.value !== '') {
          e.preventDefault();
          setInputValue(input.value);
          setCommand([...command, input.value]);
          input.value = '';
        }
    }, [command]);


    useEffect(() => {
        if(inputValue){
            console.log('Input value updated:', inputValue);
        }
    }, [handleKeyPress, inputValue])


    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            input.addEventListener('keypress', handleKeyPress);
            return () => input.removeEventListener('keypress', handleKeyPress);
        }
    }, [inputRef, handleKeyPress]);
      

    useEffect(() => {
        const scrollable = document.querySelector('.terminal');
        scrollable.scrollTop = scrollable.scrollHeight;
      }, [command]); 

      const showPDF = (pdfPath) => {
        return (
          <object data={pdfPath} type="application/pdf" width="100%" height="550px">
            <p>Your browser doesn't support embedded PDFs. You can <a href={pdfPath}>download the PDF</a> instead.</p>
          </object>
        );
      }

      function clearr() {
        const terminalDivs = document.querySelectorAll('.terminal div');
      
        terminalDivs.forEach(div => {
          if (div.id !== 'command-field') {
            div.parentNode.removeChild(div);
          }
        });
      }
      window.onload = function() {
        document.getElementById("input").focus();
      }
   
    return (
        <div className="wrapper center">
            <div className="terminal">
                    {command.map((command, index) => {
                        if(commandCalledRefs != null){
                            commandCalledRefs.current.push(ref);
                        }
                         const commandCalled = (
                            <div className="command-called" key={index} ref={ref}>
                              <h3 className="user">root@kittipong:~$</h3> <h3 className="user-called">{command}</h3>
                            </div>
                         )
                        switch(command) {
                            case 'help':
                              return <div key={index}>
                                        {commandCalled}
                                        <div className='flex'>
                                            <div className='commands-list'>
                                                <div className='item flex'>
                                                    <h3 className='list'>help</h3>
                                                    <h3 className='des'>display all commands</h3>
                                                </div>
                                                <div className='item flex'>
                                                    <h3 className='list'>whoami</h3>
                                                    <h3 className='des'>prints my necessary infomations</h3>
                                                </div>
                                                <div className='item flex'>
                                                    <h3 className='list'>project</h3>
                                                    <h3 className='des'>check out my project</h3>
                                                </div>
                                                <div className='item flex'>
                                                    <h3 className='list'>resume</h3>
                                                    <h3 className='des'>check out my resume</h3>
                                                </div>
                                                <div className='item flex'>
                                                    <h3 className='list'>github</h3>
                                                    <h3 className='des'>check out my github profile</h3>
                                                </div>
                                                <div className='item flex'>
                                                    <h3 className='list'>contact</h3>
                                                    <h3 className='des'>display ways to contact with</h3>
                                                </div>
                                                <div className='item flex'>
                                                    <h3 className='list'>clear</h3>
                                                    <h3 className='des'>clear all</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                    </div>;
                            case 'whoami':
                                 return <div key={index}>
                                            {commandCalled}
                                            <div className='my-info'>
                                                <h3>Kittipong Prasompong</h3>
                                                <h3>Interested : </h3>
                                                <li>Frontend developer</li>
                                                <li>Application developer</li>
                                                <h3>Education : </h3>
                                                <li>Bachelor of Engineer in Computer Engineer <a href='https://www.src.ku.ac.th/' target='_blank'>| Kasetsart University Sriracha campus</a></li>
                                                <div className='tech'>
                                                    <h3>Tech Stack :</h3>
                                                        <li>React JS</li>
                                                        <li>HTML CSS</li>
                                                        <li>Java</li>
                                                        <li>C C++</li>
                                                        <li>Python</li>
                                                        <li>UX UI Design</li>
                                                </div>
                                            </div>
                                            <br></br>
                                        </div>;
                            case 'github':
                                if (inputValue === 'github') {
                                    return (
                                      <div key={index}>
                                        {commandCalled}
                                        {window.open('https://github.com/ikkyuuq', '_blank')}
                                        <br></br>
                                      </div>
                                    );
                                  }
                            case 'resume':
                                return <div key={index}>
                                        {commandCalled}
                                        {showPDF('/resume.pdf')}
                                        <br></br>
                                    </div>
                            case 'clear':
                                if(inputValue === 'clear'){
                                    {clearr()}
                                }
                                return;
                            case 'project':
                                return <div key={index}>
                                    {commandCalled}
                                    <div className='my-info'>
                                        <li>IoT Fingerprint to unlock</li>
                                        <li>Interactive website portfolio <a href='https://kittipong-portfolio.netlify.app/' target="_blank">[Click here to go]</a></li>
                                        <br></br>
                                        <p>And more in github...</p>
                                        <br></br>
                                    </div>
                                </div>
                            case 'contact':
                                return <div key={index}>
                                    {commandCalled}
                                    <div className='my-info'>
                                        <li>Facebook: <a href='https://www.facebook.com/ikkyuu.prasompong.33/' target='_blank'>Ikkyuu Prasompong</a></li>
                                        <li>Instagram: <a href='https://www.instagram.com/ikkyuu.q/' target='_blank'>ikkyuu.q</a></li>
                                        <li>Email: <a>kittipongprasompong@gmail.com</a></li>
                                        <li>Phone: <a>(+66) 098-106-8486</a></li>
                                    </div>
                                    <br></br>
                                </div>
                            default:
                              return <div key={index}>
                                        {commandCalled}
                                        <h3 className='no-command'>'{command}' is not recognized, try 'help' to see commands</h3>
                                        <br></br>
                                    </div>;
                        }  
                    })}

                <div id="command-field" className="flex center">
                    <h3 className='user'>root@kittipong:~$</h3>
                    <input 
                        type="text" 
                        id='input' 
                        name="input" 
                        ref={inputRef}
                        autoFocus
                        autoComplete="false"
                    />
                </div>
            </div>
        </div>
    );  
}