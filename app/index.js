class Calculator {
  constructor(initialValue) {
    this.initialValue = initialValue;
    this.value = initialValue;
  }

  input(value) {
    if (this.value == 0) this.value = value;
    this.value += value;
  }

  reset() {
    this.value = this.initialValue;
  }

  calculate() {
    this.value = eval(this.value);
  }

  print() {
    output.innerHTML = this.value;
  }
}

var calculator = new Calculator(0);
calculator.output = document.querySelector("#result");


document.addEventListener("click", function(event) {
  var text, action;
  text = event.target.innerText;

  if (typeof text == "number") action = "inputNumber";
  if (text == "AC") action = "reset";
  if (text == "=") action = "calculate";

  switch (action) {
    case "inputNumber":
      calculator.input(text);
      break;
    case "reset":
      calculator.reset();
      break;
    case "calculate":
      calculator.calculate();
  }

  calculator.print();
});
