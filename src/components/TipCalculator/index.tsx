import "./style.css";
import dollar from "../../assets/images/icon-dollar.svg";
import person from "../../assets/images/icon-person.svg";
import { useState } from "react";

interface TipData {
  bill: string | number;
  selectTip: string | number;
  numberOfPeople: string | number;
  customTipValue: string | number;
}

function TipCalculator() {
  const [tipData, setTipData] = useState<TipData>({
    bill: 0,
    selectTip: "",
    numberOfPeople: "",
    customTipValue: 0,
  });

  const [selectTip, setSelectTip] = useState<any>(undefined);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setTipData((prevTipData) => ({
      ...prevTipData,
      [name]: value ? Number(value) : "",
    }));
    if (name === "customTipValue" || name === "selectTip") {
      const newName =
        name === "customTipValue" ? "selectTip" : "customTipValue";
      setTipData((prevTipData) => ({
        ...prevTipData,
        [newName]: "",
      }));
    }
  }

  function handleClick(event: any) {
    const target = event.target;
    setSelectTip((prev: any) => {
      if (prev) prev.classList.remove("tip-selector-selected");
      target.classList.add("tip-selector-selected");
      return target;
    });
  }

  function updateTipAmount(
    bill: number | string,
    tip: number | string,
    numberOfPeople: number | string
  ) {
    if (!bill || !tip || !numberOfPeople) return 0;
    return (Number(bill) * (Number(tip) / 100)) / Number(numberOfPeople);
  }

  function updateTotalAmount(
    bill: number | string,
    tip: number | string,
    numberOfPeople: number | string
  ) {
    if (!bill || !tip || !numberOfPeople) return 0;
    return (
      Number(bill) / Number(numberOfPeople) +
      updateTipAmount(bill, tip, numberOfPeople)
    );
  }

  function reset() {
    setTipData(() => ({
      bill: "",
      selectTip: "",
      numberOfPeople: "",
      customTipValue: "",
    }));
    setSelectTip((prev: any) => {
      prev.classList.remove("tip-selector-selected");
      return undefined;
    });
  }

  return (
    <div className="tip-calculator">
      <div className="tip-calculator-container">
        <div className="bill-inputs">
          <div className="bill-input">
            <label htmlFor="bill">Bill</label>
            <input
              id="bill"
              name="bill"
              type="number"
              onChange={handleChange}
              value={tipData.bill ? tipData.bill : ""}
            />
            <img className="dollar-img" src={dollar} alt="" />
          </div>
          <div className="tip-selector">
            <h2 className="tip-selector-title">Select Tip %</h2>
            <div className="tip-selector-options" onClick={handleClick}>
              <button name="selectTip" value="5" onClick={handleChange}>
                5%
              </button>
              <button name="selectTip" value="10" onClick={handleChange}>
                10%
              </button>
              <button name="selectTip" value="15" onClick={handleChange}>
                15%
              </button>
              <button name="selectTip" value="25" onClick={handleChange}>
                25%
              </button>
              <button name="selectTip" value="50" onClick={handleChange}>
                50%
              </button>
              <input
                type="number"
                name="customTipValue"
                onChange={handleChange}
                placeholder="Custom"
                value={tipData.customTipValue ? tipData.customTipValue : ""}
              />
            </div>
          </div>
          <div className="bill-input">
            <p
              className={`hidden ${
                tipData.numberOfPeople === 0 ? "display-error" : ""
              }`}
            >
              Can't be zero
            </p>
            <label htmlFor="number-people">Number of People</label>
            <input
              id="number-people"
              type="number"
              name="numberOfPeople"
              onChange={handleChange}
              className={`${
                tipData.numberOfPeople === 0 ? "error-outline" : ""
              }`}
              value={tipData.numberOfPeople ? tipData.numberOfPeople : ""}
            />
            <img className="person-img" src={person} alt="" />
          </div>
        </div>

        <div className="results-container">
          <div className="results">
            <div className="results-details">
              <div className="results-details-total">
                <h2>Tip Amount</h2>
                <p>/ person</p>
              </div>
              <p className="amount">
                $
                {updateTipAmount(
                  tipData.bill,
                  tipData.selectTip
                    ? tipData.selectTip
                    : tipData.customTipValue,
                  tipData.numberOfPeople
                ).toFixed(2)}
              </p>
            </div>
            <div className="results-details">
              <div className="results-details-total">
                <h2>Total</h2>
                <p>/ person</p>
              </div>
              <p className="amount">
                $
                {updateTotalAmount(
                  tipData.bill,
                  tipData.selectTip
                    ? tipData.selectTip
                    : tipData.customTipValue,
                  tipData.numberOfPeople
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <button onClick={reset} className="reset-button">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default TipCalculator;
