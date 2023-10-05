import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(1);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialChars,
  ]);

  const calculateSecurityLevel = (length) => {
    if (length < 5) {
      return "Muy poco segura";
    } else if (length < 8) {
      return "Poco segura";
    } else if (length < 10) {
      return "Buena";
    } else if (length < 12) {
      return "Segura";
    } else {
      return "Muy segura";
    }
  };

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charset = "";
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSpecialChars) charset += specialChars;

    if (charset === "") {
      setPassword("Selecciona al menos una opción");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password === "Selecciona al menos una opción") {
      return;
    }

    const textField = document.createElement("textarea");
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert("Contraseña copiada al portapapeles.");
  };

  const securityLevel = calculateSecurityLevel(length);
  const securityClass = getSecurityClass(securityLevel);

  function getSecurityClass(securityLevel) {
    switch (securityLevel) {
      case "Muy poco segura":
        return "insecure";
      case "Poco segura":
        return "poor";
      case "Buena":
        return "good";
      case "Segura":
        return "secure";
      case "Muy segura":
        return "very-secure";
      default:
        return "";
    }
  }

  return (
    <div className="App">
      <h1>Generador de Contraseñas</h1>
      {password && (
        <div className="password-generate">
          <h2>Contraseña Generada:</h2>
          <p>{password}</p>
          <span id="security" className={securityClass}>
            Seguridad: {securityLevel}
          </span>
          <button onClick={copyToClipboard}>Copiar al Portapapeles</button>
        </div>
      )}
      <div className="input-range">
        <label>Longitud de la Contraseña:</label>
        <input
          type="range"
          min="1"
          max="100"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <span>{length}</span>
      </div>
      <div>
        <label>Mayúsculas:</label>
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
        />
      </div>
      <div>
        <label>Minúsculas:</label>
        <input
          type="checkbox"
          checked={includeLowercase}
          onChange={() => setIncludeLowercase(!includeLowercase)}
        />
      </div>
      <div>
        <label>Números:</label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
      </div>
      <div>
        <label>Caracteres Especiales:</label>
        <input
          type="checkbox"
          checked={includeSpecialChars}
          onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
        />
      </div>
    </div>
  );
}

export default App;
