const displayInput = document.getElementById("inputValue");

const operators = ["-", "+", "%", "*", "/"];
let operations = [];
let currValue = "";

function handleInteraction(value) {
  console.log(value);

  if (operators.includes(value)) {
    handleOperatorInput(value);
  } else {
    handleNumericInput(value);
  }

  updateUI();
}

function handleNumericInput(value) {
    if(value === '.' && currValue.includes('.')){return}
  currValue += value;
}

function handleOperatorInput(value) {
  if (!currValue) {
    return;
  }

  operations.push(currValue);
  operations.push(value);
  currValue = "";
}

function handleReset() {
  currValue = "";
  operations = [];
  updateUI();
}

function handleEvaluate() {
  if (operations.length === 0) {
    return;
  }
  let finalAmount = operations[0];
  let prevOperator = null;
  if (!currValue) {
    operations.pop();
  } else {
    operations.push(currValue);
    currValue = "";
  }

  for (let i = 1; i < operations.length; i++) {
    if (i % 2 === 0) {
      finalAmount = eval(`${finalAmount} ${prevOperator} ${operations[i]}`);
    } else {
      prevOperator = operations[i];
    }
  }
  operations = []
  currValue = finalAmount.toFixed(2)
  updateUI()
}

function updateUI() {
  const displayString = operations.join(" ") + currValue;
  displayInput.innerText = displayString.trim() ? displayString : 0;
}
