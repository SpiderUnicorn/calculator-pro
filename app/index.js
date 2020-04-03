class CalculatorFactory {
  static create(conf) {
    return new Calculator(conf);
  }
}

class CalculatorConfiguration {
  
  constructor(initialValue, output, colors) {
    this.initialValue = initialValue;
    this.output = output;
    this.colors = colors;
  }

}

class CalculatorConfigurationBuilder {

  constructor(initialValue) {
    this.initialValue = initialValue;
  } 

  output(node) {
    this.output = node;
    return this
  }

  addColors(colorBuilder) {
    this.colors = colorBuilder.Build();
    this.output.style['background-color'] = this.colors.resultClr;

    return this;
  }


  Build() {
    return new CalculatorConfiguration(this.initialValue, this.output, this.colors);
  }
}

class CalculatorConfigurationColorBuilder {
  resultColor(color) {
    this.resultClr = color;
    return this;
  }

  brownButtonColor(color) {
    this.brownButtonColor = color;
    return this;
  }

  Build() {
    return {
      resultClr: this.resultClr,
      brownButtonColor: this.brownButtonColor
    }
  }
}

class Calculator {
  constructor(conf) {
    this.output = conf.output;
    this.initialValue = conf.initialValue;
    this.value = conf.initialValue;
  }

  input(value) {
    if (this.value == 0)  
           this.value = value;
      this.value += value;
  }

  reset() {
    this.value = this.initialValue;
  }

  calculate() {
    this.value = eval(this.value);
  }

  print() {
    this.output.innerHTML = this.value;
  }
}

var cccb = new CalculatorConfigurationColorBuilder().resultColor("rgba(0, 0, 0, 0.8)").brownButtonColor("orange");

var c = new CalculatorConfigurationBuilder(0)
  .output(document.querySelector("#result")).addColors(cccb)
  .Build();

var calculator = CalculatorFactory.create(c);


document.addEventListener("click", function(event) {
  var text, action, event;

  text = event.target.innerText;

  if (typeof -text == "number") action = "inputNumber";
  if (text == "AC") action = "reset";
  if (text == "=") action = "calculate";
  if(action == "inputNumber") {
    document.dispatchEvent(new CustomEvent('numberInputted', {  detail: { number: text }}))
  }
  if(action == "reset") {
    document.dispatchEvent(new CustomEvent('resetted'))
  }
  if(action == "calculate") {
    document.dispatchEvent(new CustomEvent('calculated'))
  }
});


document.addEventListener("numberInputted", function(event) {
  calculator.input(event.detail.number);
  calculator.print();

})

document.addEventListener("resetted", function() {
  calculator.reset();
  calculator.print();

})

document.addEventListener("calculated", function() {
  calculator.calculate();
  calculator.print();
})
