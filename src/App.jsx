import { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operat, setOperat] = useState(null);
  const [result, setResult] = useState(null);

  const numClick = (value) => {
    if (result === "Ошибка") {
      setNum1(value);
      setNum2("");
      setOperat(null);
      setResult(null);
      return;
    }

    if (result !== null && operat !== null) {
      setNum2(num2 + value);
      return;
    }

    if (result !== null && operat === null) {
      setNum1(value);
      setResult(null);
      return;
    }

    if (operat === null) {
      setNum1(num1 + value);
    } else {
      setNum2(num2 + value);
    }
  };

  const operatOnclick = (oper) => {
    if (result === "Ошибка") {
      setNum1("");
      setNum2("");
      setOperat(null);
      setResult(null);
      return;
    }

    if (num1 && num2) {
      calculate();
      setOperat(oper);
    } else if (num1) {
      setOperat(oper);
    }
  };

  const calculate = () => {
    if (!num1 || !operat) return;

    const a = Number(num1);
    const b = num2 ? Number(num2) : a;
    let res;

    switch (operat) {
      case '+':
        res = a + b;
        break;
      case '-':
        res = a - b;
        break;
      case '*':
        res = a * b;
        break;
      case '/':
        if (b === 0) {
          setResult("Ошибка");
          setNum1("");
          setNum2("");
          setOperat(null);
          return;
        }
        res = a / b;
        break;
      case '%':
        res = a % b;
        break;
      default:
        return;
    }

    setResult(res);
    setNum1(String(res));
    setNum2("");
    setOperat(null);
  };

  const clearAll = () => {
    setNum1("");
    setNum2("");
    setOperat(null);
    setResult(null);
  };

  return (
    <>
      <div className="input_container">
        <div className="input_text">
          {num1} {operat} {num2}
        </div>
        <input
          type="text"
          placeholder="0"
          value={result !== null ? result : num2 || num1}
          readOnly
        />
      </div>

      <table>
        <thead>
          <tr>
            <td onClick={() => numClick("7")}>7</td>
            <td onClick={() => numClick("8")}>8</td>
            <td onClick={() => numClick("9")}>9</td>
            <td onClick={clearAll}>AC</td>
            <td className="operator" onClick={() => operatOnclick("/")}>/</td>
          </tr>
          <tr>
            <td onClick={() => numClick("4")}>4</td>
            <td onClick={() => numClick("5")}>5</td>
            <td onClick={() => numClick("6")}>6</td>
            <td className="operator" onClick={() => operatOnclick("%")}>%</td>
            <td className="operator" onClick={() => operatOnclick("*")}>x</td>
          </tr>
          <tr>
            <td onClick={() => numClick("1")}>1</td>
            <td onClick={() => numClick("2")}>2</td>
            <td onClick={() => numClick("3")}>3</td>
            <td className="operator" onClick={() => operatOnclick("+")}>+</td>
            <td className="operator" onClick={() => operatOnclick("-")}>-</td>
          </tr>
          <tr>
            <td onClick={() => numClick("0")}>0</td>
            <td onClick={() => numClick(".")}>.</td>
            <td className="operator" colSpan={3} onClick={calculate}>=</td>
          </tr>
        </thead>
      </table>
    </>
  );
}

export default App;
