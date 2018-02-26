function Mod(init) {
  // special module for computer system, mass spec, etc.
}
function Item(name, desc, init){
    this.name = name;
    this.desc = desc;
    this.init = init;
    // this.commands = undefined; // this will be a map if there are special specific commands
    this.lookAt = function() {
      display(this.desc);
    };
    this.look = function() {
      display(this.init);
    };
    this.use = function() {
      display("I don't think this will be useful right now.");
    };
}
  
function Room(name, desc){
    this.north = undefined;
    this.east = undefined;
    this.south = undefined;
    this.west = undefined;
    this.items = [];
    this.name = name;
    this.desc = desc;
    this.open = true;
    this.locked = false;
    //a function that prints the name and desc when the room is entered
    this.itemLook = function() {
      for(var i = 0; i<this.items.length; i++){
        this.items[i].look();
      }
    };
    this.look = function() {
      display("<b>" + this.name + "</b>");
      display(this.desc);
      this.itemLook();
    }
}
  
function upDown(up, down){
    up.south = down;
    down.north = up;
}
  
function leftRight(left, right){
    left.east = right;
    right.west = left;
}
  
var Sleep_chamber = new Room("Sleep Chamber","The chamber in which I slept in induced cyrogenic hibernation.\nMy sleep pod seems to have blown a fuse. There are a few other malfunctioned pods.\nMost of the crew seems to still be in hibernation.\nThere is a single exit to the starboard/east side.<br><br>A body with a pool of green blood lies across the floor.");
var Hall1 = new Room("Main Hallway","A hallway stretches north and south.\nThere are entrances to the west, south, and east.");
var Hall2 = new Room("Main Hallway","A hallway stretches north and south.\nThere is a single entrance to the west.");
var Hall3 = new Room("Main Hallway","A hallway strtches north and south.\nThere are entrances to the west and east.");
var Hall4 = new Room("Main Hallway","A hallway stretches north and south.\nThere is a single entrance to the north.");
var Escape_pod = new Room("Escape Pod","An escape pod. The south window is blocked by an alien growth.\nThere is an exit to the west.");
var Airlock = new Room("Airlock","The airlock of the vessel. There is a spacesuit contained within a glass chamber in the far corner;\nhowever, an identical chamber is shattered in the other corner.");
var Bridge = new Room("Bridge","Write an actual description here. There is a single exit to the south.");
var Engineering = new Room("Engineering","Write an actual description here. There are exits to the north, west, and south.");
var Cargo_bay = new Room("Cargo Bay","It is pitch black. I hope I am not eaten by a grue.");
var Lab = new Room("Laboratory","I bet science goes on in here. The exit is to the east.");
var Cafe = new Room("Cafeteria","Food. Exits to the west and east.");
var Sick_bay = new Room("Sick Bay","I feel nauseous just staying in here. There is a door to the north. Exit to the east.");
var Computer_system = new Room("Computer Control Room","I think this controls the navigation and life support, among other things.");
var Crew_quarters = new Room("Crew Quarters","I feel like I've had some nice conversations here. Entrances from the north and east.");
var Your_quarters = new Room("Quarters","My home away from home. Exit south.");
  
upDown(Bridge, Hall4);
upDown(Computer_system, Sick_bay);
upDown(Hall4, Hall3);
upDown(Hall3, Hall2);
upDown(Your_quarters, Crew_quarters);
upDown(Hall2, Hall1);
upDown(Hall1, Engineering);
upDown(Engineering, Cargo_bay);
leftRight(Sick_bay, Hall3);
leftRight(Hall3, Airlock);
leftRight(Sleep_chamber, Hall2);
leftRight(Crew_quarters, Cafe);
leftRight(Cafe, Hall1);
leftRight(Hall1, Escape_pod);
leftRight(Lab, Engineering);

Escape_pod.open = false;
// Lab.open = false;
Your_quarters.open = false;
Computer_system.open = false;
Airlock.locked = true;
Bridge.locked = true;

// update the poster desc
var instrPoster = new Item("poster","The poster reads:<br><br>Welcome to CCC! Here are some of the recognized commands...<br>l or look; look at /something/; go /direction/; gn, ge, gs, gw;\ntake /something/; use /someting/; say /something/<br>There are others, so be creative!<br><br>Quite a strange poster I'd say...","A strange poster hangs on the wall.")
var flashlight = new Item("flashlight","A perfectly normal flashlight.","A flashlight lies on the floor.");
flashlight.use = function() {
  if (current == Cargo_bay) {
    // light up the room and reveal some more items
  }
  else {
    display("I don't think this will be useful right now.");
  }
};
// need some item to unlock rooms
var rations = new Item("rations","The standard rations. Dry, not fun, but all-around better than starving.", "I know a way to cheat the dispenser to get some free rations.");
rations.look = function() {
  if (current == Cafe) {
    display(this.init);
  }
  else {
    display("There are some rations on the floor.");
  }
}
rations.use = function() {
  display("I'm not hungry right now.");
};
// have some way to use the food from the cafeteria, possibly multiple times

// why is there blood in this story? probably from the grue

// the blood is acidic, so when you put it in the chemical analyzer, it corrodes and destroys it
var flask = new Item("flask", "An ordinary lab flask.", "A flask lies on floor.");
flask.use = function() {
  if (current == Sleep_chamber) {
    flask.name = "flask with blood";
    flask.desc = "A lab flask filled with blood";
    flask.init = "A blood-filled flask lies on the floor.";
    var itemList = document.getElementById("itemList");
    var itemStub = document.createElement("li");
    var prev = document.getElementById("flask");
    itemStub.innerHTML = flask.name;
    itemStub.setAttribute("id", flask.name);
    itemList.replaceChild(itemStub, prev);
    display("Took blood.");
    // should I just update so that it says "flask with blood?"

  // have some else ifs for other things other than blood
  // make some way to empty flask
  }
  else {
    display("There's nothing in this room that I can hold in this flask.");
  }
};

var key = new Item("key", "The captain's access card.", "There's a key in the far corner.");
// make unlock and lock functions specific to key

key.use = function(room) {
  if (room.locked) {
    room.locked = false;
    display("Unlocked the door.");
  }
  else {
    room.locked = true;
    display("Locked the door.");
  }
};

Sleep_chamber.items.push(instrPoster);
Sick_bay.items.push(flashlight);
Cafe.items.push(rations);
Lab.items.push(flask);
Crew_quarters.items.push(key);

  // adjust open boolean
  
  // need to make the module so that you can differentiate whether it is possible to go from one room to another even though they are connected (is door unlocked/is the way blocked)
  
var current = Sleep_chamber;