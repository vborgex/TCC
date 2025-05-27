import { useState } from "react";

function Test() {
  const [arr, setArr] = useState([{ type: "text", value: "" }]);

  const addInput = () => {
    setArr((prev) => [...prev, { type: "text", value: "" }]);
  };

  const removeInput = (indexToRemove) => {
    // Só remove se houver mais de 1 item
    if (arr.length > 1) {
      setArr((prev) => prev.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    setArr((prev) => {
      const newArr = [...prev];
      newArr[index].value = value;
      return newArr;
    });
  };

  return (
    <div>
      <button onClick={addInput}>+ Adicionar critério</button>
      {arr.map((item, i) => (
        <div
          key={i}
          style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
        >
          <input
            type={item.type}
            value={item.value}
            onChange={(e) => handleChange(e, i)}
            size="40"
            placeholder={`Critério ${i + 1}`}
          />
          <button
            onClick={() => removeInput(i)}
            disabled={arr.length === 1}
            style={{ marginLeft: "8px" }}
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}
export default Test;
