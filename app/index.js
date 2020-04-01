document.addEventListener("click", function(event) {
  var text = event.target.innerText;

  var x = document.querySelector("#result");

  if (window.isDone) {
      window.isDone = false;
      x.innerHTML = 0;
  }
  if (text == 'AC') {
      x.innerHTML = 0;
      return;
  }
  if (text == "=") {
    x.innerHTML = eval(x.innerHTML);
    window.isDone = true;
  } else {
    if (x.innerHTML == 0) {
      x.innerHTML = text;
    } else {
      x.innerHTML += text;
    }
  }
});
