function Mod(name, desc, init) {
  // special module for computer system, mass spec, etc.
  // this.takeable = false;
  this.name = name;
  this.desc = desc;
  this.init = init;
  this.look = function() {
    display(this.init);
  };
  this.lookAt = function() {
    display(this.desc);
  };
  this.commands = new Map(); // all keys in the map must be uppercase to make case-checking easier
}
function Item(name, desc, init) {
    // there really should just be a boolean for if the item is able to be taken, then there is no need for the Mod class
    // this.takeable = true;
    this.name = name;
    this.desc = desc;
    this.init = init;
    this.commands = new Map(); // this will be a map if there are special specific commands
    // all keys in the map must be uppercase to make case-checking easier
    this.lookAt = function() {
      display(this.desc);
    };
    this.look = function() {
      display(this.init);
    };
    this.use = function() {
      // now that I have specific commands, make it a module with the use function
      display("I don't think this will be useful right now.");
    };
}

function splitHasCommand(split) {
  // later add functionality for Mod class
  // what if the command has multiple tokens, like "turn on flashlight"?
  var hasCommand = false;
  for (var i = 0; i<inventory.length; i++) {
    if (inventory[i].commands.has(split[0].toUpperCase())) {
      hasCommand = true;
    }
  }
  for (var i = 0; i<current.mods.length; i++) {
    if (current.mods[i].commands.has(split[0].toUpperCase())) {
      hasCommand = true;
    }
  }
  return hasCommand;
}

function findCommand(split) {
  // add funcationality for Mod class
  for (var i = 0; i<inventory.length; i++) {
    if (inventory[i].commands.has(split[0].toUpperCase())) {
      var command = inventory[i].commands.get(split[0].toUpperCase());
      return command;
    }
  }
  for (var i = 0; i<current.mods.length; i++) {
    if (current.mods[i].commands.has(split[0].toUpperCase())) {
      var command = current.mods[i].commands.get(split[0].toUpperCase());
      return command;
    }
  }
}
  
function Room(name, desc){
    this.north = undefined;
    this.east = undefined;
    this.south = undefined;
    this.west = undefined;
    this.items = [];
    this.mods = [];
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
    this.modLook = function() {
      for (var i = 0; i<this.mods.length; i++) {
        this.mods[i].look();
      }
    };
    this.look = function() {
      display("<b>" + this.name + "</b>");
      display(this.desc);
      this.itemLook();
      this.modLook();
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
    Cargo_bay.desc = "Below a spiral of steel stairs and amid  the maze of cargo rests a monstruous grue. I think it just blinked at me.";
    Cargo_bay.look();
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
rations.commands.set("EAT", rations.use);

// have some way to use the food from the cafeteria, possibly multiple times

// why is there blood in this story? probably from the grue

// the blood is acidic, so when you put it in the chemical analyzer, it corrodes and destroys it
var flask = new Item("flask", "An ordinary lab flask.", "A flask lies on floor.");
function fillFlask() {
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
  }
  else {
    display("There's nothing in this room that I can hold in this flask.");
  }
}
flask.use = fillFlask;
flask.commands.set("FILL", fillFlask);


var key = new Item("key", "The captain's access card.", "There's a key in the far corner.");
function unlock(split) {
  // add split.includes("north") etc. to each condition
  if (split.length > 1) {
    if ((split[1].toUpperCase() == "NORTH") && (current.north !== undefined) && current.north.locked && current.north.open) {
      current.north.locked = false;
      display("Unlocked the north door.");
    }
    else if ((split[1].toUpperCase() == "EAST") && (current.east !== undefined) && current.east.locked && current.east.open) {
      current.east.locked = false;
      display("Unlocked the east door.");
    }
    else if ((split[1].toUpperCase() == "SOUTH") && (current.south !== undefined) && current.south.locked && current.south.open) {
      current.south.locked = false;
      display("Unlocked the south door.");
    }
    else if ((split[1].toUpperCase() == "WEST") && (current.west !== undefined) && current.west.locked && current.west.open) {
      current.west.locked = false;
      display("Unlocked the west door.");
    }
    else {
      display("I can't unlock that.");
    }
  }
  else {
    display("I'm not sure what I'm trying to unlock.");
  }
}
function lock(split) {
  // change so that you don't lock a door that is not open
  if (split.length > 1) {
    if ((split[1].toUpperCase() == "NORTH") && (current.north !== undefined) && !(current.north.locked) && current.north.open) {
      current.north.locked = true;
      display("Locked the north door.");
    }
    else if ((split[1].toUpperCase() == "EAST") && (current.east !== undefined) && !(current.east.locked) && current.east.open) {
      current.east.locked = true;
      display("Locked the east door.");
    }
    else if ((split[1].toUpperCase() == "SOUTH") && (current.south !== undefined) && !(current.south.locked) && current.south.open) {
      current.south.locked = true;
      display("Locked the south door.");
    }
    else if ((split[1].toUpperCase() == "WEST") && (current.west !== undefined) && !(current.west.locked) && current.west.open) {
      current.west.locked = true;
      display("Locked the west door.");
    }
    else {
      display("I can't lock that.");
    }
  }
  else {
    display("I'm not sure what I'm trying to lock.");
  }
}
key.use = function() {
  display("I'm not sure whether I'm unlocking or locking with this key.");
};
// *** in order to make case-checking easier, make all the keys uppercase ***
key.commands.set("UNLOCK", unlock);
key.commands.set("LOCK", lock);

var mass_spec = new Mod("mass spec", "A mass spectrometer commonly used to analyze the chemical makeup of a substance in a flask.", "There's a mass spec in the room.");
function analyze(split) {
  // use split.includes(); for blood or if it includes flask, also check if it has blood
  // case 1: analyze flask with blood
  // case 2: display("i cant analyze that")
};
mass_spec.commands.set("ANALYZE", analyze);

var body = new Mod("body", "An alien body. It seems to have died recently from a wound.", "");
var blood = new Mod("blood", "Some green nasty-looking alien blood.", "");

Sleep_chamber.items.push(instrPoster);
Sick_bay.items.push(flashlight);
Cafe.items.push(rations);
Lab.items.push(flask);
Crew_quarters.items.push(key);

Lab.mods.push(mass_spec);
Sleep_chamber.mods.push(body);

  // adjust open boolean
  
  // need to make the module so that you can differentiate whether it is possible to go from one room to another even though they are connected (is door unlocked/is the way blocked)
  
var current = Sleep_chamber;