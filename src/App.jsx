import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //ref hook
  const passwordRef = useRef(null);

  //password generator
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&?><+/*-";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str[char];
    }
    setPassword(pass);
  }, [numberAllowed, charAllowed, length, setPassword]);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md fixed top-10 rounded-lg left-1/3 shadow-lg text-center text-orange-500 bg-slate-700">
        <h1 className="text-xl text-white font-bold">Password Generator</h1>
        <div className="flex justify-center shadow-lg overflow-hidden py-2 px-6">
          <input
            className="font-medium w-full tracking-tight rounded-s-md px-2 outline-none"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-600 font-semibold text-white rounded-e-md p-1 hover:bg-blue-800"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center py-1 gap-5">
          <div className="flex gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(evt) => setLength(evt.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex gap-x-1 pt-">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className="flex gap-x-1 pt-">
            <input
              type="checkbox"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
