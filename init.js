window.onbeforeunload = function(event) {
  return confirm("Do you really wanna refresh? You'd lose all your progress.");
};

var pNum = 0;

function display(text) {
  var mainDiv = document.getElementById("display_input");
  var form = document.getElementById("form");
  var nextText = document.createElement("p");
  nextText.innerHTML = text;
  mainDiv.insertBefore(nextText, form);
  pNum++;
}

function display1() {
  display("I woke up feeling oddly refreshed, like waking up from a cold, crisp catnap.");
}

function display2() {
  display("I had no clue why I emerged from cyrogenic sleep.");
}

function display3() {
  display("All that I recall is that I just signed up as an engineer on the SEC Delano, a deep-space exploration starship.");
}

function display4() {
  display("As refreshing as the nap was, I didn't like what I was waking up to; shards of glass and green specks dotted the floor. A faint siren can be heard to the aft/south side.");
}

// I need to actually address the siren

function display5() {
  display("Ugh. My boss is going to give me an earful today.");
}

function initLook() {
    current.look();
}

function enable() {
  var input = document.getElementById("input");
  input.removeAttribute("disabled");
  input.focus();
}

var toggleTheme = document.getElementById("toggleTheme");
function toLight() {
  document.body.style.color = 'black';
  document.body.style.backgroundColor = 'white';
  document.getElementById("input").style.backgroundColor = 'white';
  // switch image
  document.getElementById("input").style.backgroundImage = 'url(terminal3inverted.png)';
  // switch caret color
  document.getElementById("input").style['caret-color'] = 'black';
  // switch input text color
  document.getElementById("input").style.color = 'black';
  toggleTheme.innerHTML = "Dark Theme";
  toggleTheme.addEventListener("click", toDark);
  toggleTheme.removeEventListener("click", toLight);
}
function toDark() {
  document.body.style.color = 'white';
  document.body.style.backgroundColor = 'black';
  document.getElementById("input").style.backgroundColor = 'black';
  // switch image back
  document.getElementById("input").style.backgroundImage = 'url(terminal3.png)';
  // switch caret color back
  document.getElementById("input").style['caret-color'] = 'white';
  // switch input text color
  document.getElementById("input").style.color = 'white';
  toggleTheme.innerHTML = "Light Theme";
  toggleTheme.addEventListener("click", toLight);
  toggleTheme.removeEventListener("click", toDark);
}
toggleTheme.addEventListener("click", toLight);

//** TODO ** adjust the timing
setTimeout(display1, 3000);
setTimeout(display2, 6000);
setTimeout(display3, 9000);
setTimeout(display4, 14000);
setTimeout(display5, 17000);
setTimeout(initLook, 18000);
setTimeout(enable, 18000);
// disable the form input for the intro