var hasWon = false;

// ** TO DO ** make more than one way to win??

// scenario: you activate acid shower from computer system and the ship will be destroyed with you inside it (you think)

// 1 sec

function scroll() { // doesnt actually scroll, rather removes excess p tags if needed
    var div = document.getElementById("display_input");
    if (pNum>8) {
        var first = div.firstChild;
        div.removeChild(first);
        pNum--;
    }
}

function displayone() {
    display("The shower rained down briskly.");
    scroll();
}

// 1.5 sec
function displaytwo() {
    display("Oddly, it smelt just like rain.");
    scroll();
}

// 1 sec
function displaythree() {
    display("Despite my impending doom, I feel at peace.");
    scroll();
}

// 1.5 sec
function displayfour() {
    display("Slumped against the computer, muffled sirens blaring through the door, I puffed out a sigh and closed my eyes for the final time...");
    scroll();
}

// 6 sec
function displayfive() {
    display("A COLD, CRISP CATNAP <br><br> THE END");
    scroll();
}

function win() {
    // add delays 
    setTimeout(displayone, 1000);
    setTimeout(displaytwo, 2500);
    setTimeout(displaythree, 3500);
    setTimeout(displayfour, 5000);
    setTimeout(displayfive, 11000);
    // ** TO DO ** disable keyboard input
}
