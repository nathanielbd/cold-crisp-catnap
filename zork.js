
var inventory = [];
function itemInInv(itemName) {
    for (var i=0; i<inventory.length; i++) {
        if (inventory[i].name.toUpperCase().includes(itemName.toUpperCase())) {
            return inventory[i];
        }
    }
    return null;
}
function itemInRoom(itemName) {
    for (var i=0; i<current.items.length; i++) {
        if (current.items[i].name.toUpperCase().includes(itemName.toUpperCase())) {
            return current.items[i];
        }
    }
    // case if Mod
    for (var i = 0; i<current.mods.length; i++) {
        if (current.mods[i].name.toUpperCase().includes(itemName.toUpperCase())) {
            return current.mods[i];
        }
    }
    return null;
}
function take(item) {
    // consider takeable boolean
    // var inventoryTitle = document.getElementById("inventoryTitle");
    // var itemList = document.getElementById("itemList");
    // if (inventory.length==0) {
    //   inventoryTitle.innerHTML="Inventory";
    // }
    inventory.push(item);
    // var itemStub = document.createElement("li");
    // itemStub.innerHTML = item.name;
    // itemStub.setAttribute("id", item.name);
    // itemList.appendChild(itemStub);
    display("Took "+item.name+".");
    document.getElementById("form").reset();
    if (!(item.name.toUpperCase() === "RATIONS") || !(current == Cafe)) {
        for (var i = 0; i<current.items.length; i++) {
            if (current.items[i] == item) {
                var index = i;
            }
        }
        current.items.splice(index , 1);
    }
}
function isInRoom(nameInSplit) {
    // replace duplication of code with this abstraction
    var inRoom = false;
    // if (splitName.length == 1) {
    //     for (var i = 0; i<current.items.length; i++) {
    //         if (nameInSplit.toUpperCase() === current.items[i].name.toUpperCase()) {
    //             inRoom = true;
    //         }
    //     }
    //     for (var i = 0; i<current.mods.length; i++) {
    //         if (nameInSplit.toUpperCase() == current.mods[i].name.toUpperCase()) {
    //             inRoom = true;
    //         }
    //     }
    // }
    // else {
        for (var i = 0; i<current.items.length; i++) {
            if (current.items[i].name.toUpperCase().includes(nameInSplit.toUpperCase())) {
                inRoom = true;
            }
        }
        for (var i = 0; i<current.mods.length; i++) {
            if (current.mods[i].name.toUpperCase().includes(nameInSplit.toUpperCase())) {
                inRoom = true;
            }
        }
    // }
    return inRoom;
}
function isInInv(nameInSplit) {
    // replace duplication of code with this abstraction
    var inInv = false;
    for (var i = 0; i<inventory.length; i++) {
        if (inventory[i].name.toUpperCase().includes(nameInSplit.toUpperCase())) {
            inInv = true;
        }
    }
    return inInv;
}
function drop(item) {
    // var itemList = document.getElementById("itemList");
    // var itemStub = document.getElementById(item.name);
    display("Dropped "+item.name+".");
    var present = false;
    for (var i=0; i<current.items.length; i++){
        if (current.items[i] == item) {
            present = true;
        }
    }
    if (!present) {
        current.items.push(item);
    }
    item.init = "The" + item.name + "is on the floor.";
    // itemStub.parentNode.removeChild(itemStub);
    inventory.splice(inventory.indexOf(item), 1);
}
function lookAt(split) {
    if (split.length==1) {
        current.look();
    }
    // loop through all of split and put all of them to uppercase
    // then use split.includes(name.toUpperCase())
    // to consider case of two-word name, you have to split the name and loop the uppercase and then use includes
    // actually don't loop cuz there will never be larger than two-word name
    else if (split[1].toUpperCase() == "AT" && split.length == 3) {
        // if in room
        // look at itemInRoom(split[2])
        // or if two-word name
        if (isInRoom(split[2]) || isInInv(split[2])) {
            var success = false;
            for(var i=0;i<current.items.length;i++){
                if(split[2].toUpperCase() == current.items[i].name.toUpperCase()){
                    // look at the item
                    success = true;
                    current.items[i].lookAt();
                }
            }
            for(var j=0;j<inventory.length;j++){
                if(split[2].toUpperCase() == inventory[j].name.toUpperCase()){
                    success = true;
                    inventory[j].lookAt();
                }
            }
            for(var k = 0; k<current.mods.length; k++) {
                if(split[2].toUpperCase() == current.mods[k].name.toUpperCase()) {
                    success = true;
                    current.mods[k].lookAt();
                }
            }
            if (!success) {
                display("I can't see that");
            }
        }
        else {
            display("I can't see that.");
        }
    }
    else if (split[1].toUpperCase() == "AT" && split.length == 4) {
        // if ((isInRoom(split[2]) && isInRoom(split[3])) || (isInInv(split[2]) && isInInv(split[3]))) {
        //     // for (var i = 0; i<current.items.length; i++) {
        //     //     if(current.items[i].name.toUpperCase().includes(split[2].toUpperCase()) && current.items[i].name.toUpperCase().includes(split[3].toUpperCase())) {
        //     //         current.items[i].lookAt();
        //     //     }
        //     // }
        //     // for (var i = 0; i<inventory.length; i++) {
        //     //     if(inventory[i].name.toUpperCase().includes(split[2].toUpperCase()) && inventory[i].name.toUpperCase().includes(split[3].toUpperCase())) {
        //     //         inventory[i].lookAt();
        //     //     }
        //     // }
        //     // for (var i = 0; i<current.mods.length; i++) {
        //     //     if(current.mods[i].name.toUpperCase().includes(split[2].toUpperCase()) && current.mods[i].name.toUpperCase().includes(split[3].toUpperCase())) {
        //     //         current.mods[i].lookAt();
        //     //     }
        //     // }
        //     itemInRoom(split[2]).lookAt();
        // }
        // else {
        //     display("I can't see that.");
        // }
        var success = false;
        for (var i = 0; i<current.items.length; i++) {
            if(current.items[i].name.toUpperCase().includes(split[2].toUpperCase()) && current.items[i].name.toUpperCase().includes(split[3].toUpperCase())) {
                success = true;
                current.items[i].lookAt();
            }
        }
        for (var i = 0; i<inventory.length; i++) {
            if(inventory[i].name.toUpperCase().includes(split[2].toUpperCase()) && inventory[i].name.toUpperCase().includes(split[3].toUpperCase())) {
                success = true;
                inventory[i].lookAt();
            }
        }
        for (var i = 0; i<current.mods.length; i++) {
            if(current.mods[i].name.toUpperCase().includes(split[2].toUpperCase()) && current.mods[i].name.toUpperCase().includes(split[3].toUpperCase())) {
                success = true;
                current.mods[i].lookAt();
            }
        }
        if (!success) {
            display("I can't see that.");
        }
    }
    // else if there is something to look at that has a two-word name
    else if (split[0].toUpperCase() == "READ" && split.length == 2) {
        var success = false;
        for(var i=0;i<current.items.length;i++){
            if(split[1].toUpperCase() == current.items[i].name.toUpperCase()){
                // look at the item
                success = true;
                current.items[i].lookAt();
            }
        }
        for(var j=0;j<inventory.length;j++){
            if(split[1].toUpperCase() == inventory[j].name.toUpperCase()) {
                success = true;
                inventory[j].lookAt();
            }
        }
        for (var k=0; k<current.mods.length; k++) {
            if(split[1].toUpperCase() == current.mods[k].name.toUpperCase()) {
                success = true;
                current.mods[k].lookAt();
            }
        }
        if (!success) {
            display("I can't see that.");
        }
    }
    else if (split[0].toUpperCase() == "READ" && split.length == 3) {
        var success = false;
        for (var i = 0; i<current.items.length; i++) {
            if(current.items[i].name.toUpperCase().includes(split[1].toUpperCase()) && current.items[i].name.toUpperCase().includes(split[2].toUpperCase())) {
                success = true;
                current.items[i].lookAt();
            }
        }
        for (var i = 0; i<inventory.length; i++) {
            if(inventory[i].name.toUpperCase().includes(split[1].toUpperCase()) && inventory[i].name.toUpperCase().includes(split[2].toUpperCase())) {
                success = true;
                inventory[i].lookAt();
            }
        }
        for (var i = 0; i<current.mods.length; i++) {
            if(current.mods[i].name.toUpperCase().includes(split[1].toUpperCase()) && current.mods[i].name.toUpperCase().includes(split[2].toUpperCase())) {
                success = true;
                current.mods[i].lookAt();
            }
        }
        if (!success) {
            display("I can't see that.");
        }
    }
    else if (split[0] == "EXAMINE" && split.length == 2) {
        var success = false;
        for(var i=0;i<current.items.length;i++){
            if(split[1].toUpperCase() == current.items[i].name.toUpperCase()){
                // look at the item
                success = true;
                current.items[i].lookAt();
            }
        }
        for(var j=0;j<inventory.length;j++){
            if(split[1].toUpperCase() == inventory[j].name.toUpperCase()) {
                success = true;
                inventory[j].lookAt();
            }
        }
        for (var k=0; k<current.mods.length; k++) {
            if(split[1].toUpperCase() == current.mods[k].name.toUpperCase()) {
                success = true;
                current.mods[k].lookAt();
            }
        }
        if (!success) {
            display("I can't see that.");
        }
    }
    else if (split[0] == "EXAMINE" && split.length == 3) {
        var success = false;
        for (var i = 0; i<current.items.length; i++) {
            if(current.items[i].name.toUpperCase().includes(split[1].toUpperCase()) && current.items[i].name.toUpperCase().includes(split[2].toUpperCase())) {
                success = true;
                current.items[i].lookAt();
            }
        }
        for (var i = 0; i<inventory.length; i++) {
            if(inventory[i].name.toUpperCase().includes(split[1].toUpperCase()) && inventory[i].name.toUpperCase().includes(split[2].toUpperCase())) {
                success = true;
                inventory[i].lookAt();
            }
        }
        for (var i = 0; i<current.mods.length; i++) {
            if(current.mods[i].name.toUpperCase().includes(split[1].toUpperCase()) && current.mods[i].name.toUpperCase().includes(split[2].toUpperCase())) {
                success = true;
                current.mods[i].lookAt();
            }
        }
        if (!success) {
            display("I can't see that.");
        }
    }
    else {
        display("I'm not sure what I'm supposed to be looking at.");
    }
}
function go(direction) {
  var success=true;
  // if(current.desc.includes("pitch")) {
  //    display("I can't see a thing.");
  //    success=false;
  // }
  // else
  if (direction.length == 2 && direction.charAt(0).toUpperCase() == 'G') {
    if (direction.toUpperCase() == "GN") {
        if (current.north===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.north.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.north.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.north.corroded && !(current.north.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.north.corroded && current.north.open) {
            display("I'm able to crawl through the hole.");
            current=current.north;
        }
        else {
            current=current.north;
        }
    }
    else if (direction.toUpperCase() == "GE") {
        if (current.east===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.east.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.east.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.east.corroded && !(current.east.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.east.corroded && current.east.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.east;
        }
        else {
            current=current.east;
        }
    }
    else if (direction.toUpperCase() == "GS") {
        if (current.south===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.south.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.south.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.south.corroded && !(current.south.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.south.corroded && current.south.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.south;
        }
        else {
            current=current.south;
        }
    }
    else if (direction.toUpperCase() == "GW") {
        if (current.west===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.west.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.west.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.west.corroded && !(current.west.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.west.corroded && current.west.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.west;
        }
        // special case with spacesuit
        else if (current == Airlock) {
            success=false;
            display("The tether on the spacesuit holds me in place. I'd have to take the suit off to exit.");
        }
        else {
            current=current.west;
        }
    }
    else if (direction.toUpperCase() == "GU") {
        // if (current.up != undefined) {
      //    current=current.up;
      // }
      // else {
      //    display("There is no way up.");
      //    success=false;
      // }
        display("There is no way up.");
        success=false;
    }
    else if (direction.toUpperCase() == "GD") {
        // ** TO DO ** uncomment constructor of down and up to undefined, uncomment this, and uncomment the case that the current.desc.includes("pitch")
      // if (current.down != undefined) {
      //    current=current.down;
      // }
      // else {
      //    display("There is no way down.");
      //    success=false;
      // }
        display("There is no way down.");
        success=false;
    }
    else {
      // error message
      display("I'm not sure where that is.");
      success=false;
    }
  }
  else if (direction.length == 1) {
    // n, e, s, w, d, u
    // console.log("split is length 1");
    if (direction == "N") {
        if (current.north===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.north.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.north.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.north.corroded && !(current.north.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.north.corroded && current.north.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.north;
        }
        else {
            current=current.north;
        }
    }
    else if (direction == "E") {
        if (current.east===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.east.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.east.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.east.corroded && !(current.east.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.east.corroded && current.east.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.east;
        }
        else {
            current=current.east;
        }
    }
    else if (direction == "S") {
        if (current.south===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.south.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.south.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.south.corroded && !(current.south.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.south.corroded && current.south.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.south;
        }
        else {
            current=current.south;
        }
    }
    else if (direction == "W") {
        if (current.west===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.west.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.west.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.west.corroded && !(current.west.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.west.corroded && current.west.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.west;
        }
        // spacesuit special case
        else if (current == Airlock) {
            success=false;
            display("The tether on the spacesuit holds me in place. I'd have to take the suit off to exit.");
        }
        else {
            current=current.west;
        }
    }
    else if (direction == "U") {
        // if (current.up != undefined) {
      //    current=current.up;
      // }
      // else {
      //    display("There is no way up.");
      //    success=false;
      // }
        display("There's no way up.");
        success=false;
    }
    else if (direction == "D") {
        // if (current.down != undefined) {
      //    current=current.down;
      // }
      // else {
      //    display("There is no way down.");
      //    success=false;
      // }
        display("There's no way down.");
        success=false;
    }
    else {
        display("I'm not sure where that is.");
        success=false;
    }
  }
  else {
    if (direction == "NORTH" || direction == "FORE") {
        if (current.north===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.north.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.north.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.north.corroded && !(current.north.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.north.corroded && current.north.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.north;
        }
        else {
            current=current.north;
        }
    }
    else if (direction == "EAST" || direction == "STARBOARD") {
        if (current.east===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.east.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.east.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.east.corroded && !(current.east.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.east.corroded && current.east.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.east;
        }
        else {
            current=current.east;
        }
    }
    else if (direction == "SOUTH" || direction == "AFT") {
        if (current.south===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.south.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.south.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.south.corroded && !(current.south.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.south.corroded && current.south.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.south;
        }
        else {
            current=current.south;
        }
    }
    else if (direction == "WEST" || direction == "PORT") {
        if (current.west===undefined) {
            display("There's a wall there.");
            success=false;
        }
        else if (!current.west.open) {
            display("I can't open the door. There seems to be something pushing against me from the other side.");
            success=false;
        }
        else if (current.west.locked) {
            display("The door seems to be locked.");
            success=false;
        }
        else if (current.west.corroded && !(current.west.open)) {
            display("I've corroded a hole, but there's an amoeba-like ooze pushing out of it.");
            success=false;
        }
        else if (current.west.corroded && current.west.open) {
            display("I'm able to crawl through the hole since the ooze is cleared.");
            current=current.west;
        }
        else {
            current=current.west;
        }
    }
    else if (direction == "UP") {
      display("There is no way up");
      success=false;
    }
    else if (direction == "DOWN") {
      // grue reference?
      display("There is no way down.");
      success=false;
    }
    else {
    // add an else with error message
      display("I'm not sure where that is.");
      success=false;
    }
  }
  if (success) {
    current.look();
  }
}

function listInventory() {
    display("I am carrying:");
    var string = "";
    for(var i = 0; i<inventory.length; i++) {
        if (i == 0) {
            string += inventory[i].name;
        }
        else {
            string += "<br>" + inventory[i].name;
        }
    }
    if (inventory.length == 0) {
        string += "nothing";
    }
    display(string);
}

var hunger = 5;
function eat(split) {
    if (split.includes("RATIONS") && hunger>0) {
        inventory.splice(inventory.indexOf(rations), 1);
        display("I guess I'm less hungry than I was before.");
        hunger--;
    }
    else if (split.includes("RATIONS") && hunger<=0) {
        display("If I eat another one of those I'll hurl.");
    }
    else {
        display("I can't eat that.");
    }
}

function drink(split) {
    if (split.includes("BLOOD")) {
        display("No thanks. I'm not drinking any of that.");
    }
    else {
        display("I can't drink that.");
    }
}

function textParse(split) {
    if (split.length == 0) {
        display("I'm not sure what that means.");
    }
    else if (split.includes("THROW")) {
        display("I don't have much of an arm. Even if I did throw, it'd probably just come back and hit me in the head.");
    }
    else if (split.includes("HIT") || split.includes("ATTACK") || split.includes("KILL")) {
        display("Violence is against my religion.");
    }
    else if (split.includes("INVENTORY") || (split.length == 1 && split[0] == "I")) {
        listInventory();
    }
    else if (split.includes("EAT")) {
        eat(split);
    }
    else if (split.includes("DRINK")) {
        drink(split);
    }
    else if (split[0] == "SHOUT") {
        var random = Math.floor(Math.random() * 2);
        if (random == 0) {
            display("Aaaaaargh!");
        }
        else {
            display("Mrglglglgl!");
        }
    }
  else if (split[0].toUpperCase() == "GO" && split.length == 2) {
      // maybe filter out 'to' from split and check if split[1] is an item name, so that "go to the rations" will output "I'm already in the same room as the rations."
    go(split[1]);
  }
  else if (split[0] == "DIAGNOSE" || split[0] == "DIAGNOSTIC") {
      display("I'm in perfect health.");
  }
  else if (split.includes("FUCK") || split.includes("SHIT") || split.includes("DAMN")) {
    display("I can't curse. This is a Christian server.");
  }
  else if (split.length == 2 && split[0].toUpperCase() == "TAKE" && split[1].toUpperCase() == "BLOOD") {
    // this really should not be hard-coded
    if (isInInv("flask")) {
        fillFlask();
    }
    else {
        display("I don't have anything to carry the blood in.");
    }
  }
  else if ((split.includes("POUR") && split.includes("BLOOD")) || split.includes("CORRODE")) {
    if (isInInv("flask with corrosive blood")) {
        if (split.includes("NORTH") && split.includes("DOOR")) {
            if (current.north != undefined && !(current.north.corroded)) {
                current.north.corroded = true;
                display("I corroded a cupboard-sized hole in the north door.");
            }
            else {
                display("I can't do that there");
            }
        }
        else if (split.includes("EAST") && split.includes("DOOR")) {
            if (current.east != undefined && !(current.east.corroded)) {
                current.east.corroded = true;
                display("I corroded a cupboard-sized hole in the east door.");
            }
            else {
                display("I can't do that there");
            }
        }
        else if (split.includes("SOUTH") && split.includes("DOOR")) {
            if (current.south != undefined && !(current.south.corroded)) {
                current.south.corroded = true;
                display("I corroded a cupboard-sized hole in the south door.");
            }
            else {
                display("I can't do that there");
            }
        }
        else if (split.includes("WEST") && split.includes("DOOR")) {
            if (current.west != undefined && !(current.west.corroded)) {
                current.west.corroded = true;
                display("I corroded a cupboard-sized hole in the west door.");
            }
            else {
                display("I can't do that there");
            }
        }
        else {
            display("I don't know where to do that.");
        } 
    }
    else {
        display("I can't do that with what I have on me.");
    }
  }
  else if (split[0].length == 2 && split[0].charAt(0).toUpperCase() == 'G'){
    go(split[0]);
  }
  else if (split[0].length == 1 && (split[0] == "N" || split[0] == "E" || split[0] == "S" || split[0] == "W")) {
    go(split[0]);
  }
  else if (split[0].toUpperCase() == "L" || split[0].toUpperCase() == "LOOK" || split[0].toUpperCase() == "READ"){
    lookAt(split);
  }
  else if (split[0].toUpperCase() === "TAKE" || split[0].toUpperCase() === "GET" || split[0].toUpperCase() == "GRAB" || split[0].toUpperCase() == "T" && split.length >= 2) {
    if (isInInv(split[1])) {
        display("I already have that.");
    }
    else if (isInRoom(split[1])) {
        if (current.mods.includes(itemInRoom(split[1]))) {
            display("That's not someting I can pick up and carry around with me.");
        }
        else {
            take(itemInRoom(split[1]));
        }
    }
    // case two-word name
    else {
        display("I can't see that.");
    }
  }
  else if (split[0].toUpperCase() == "USE" && split.length >= 2) {
    // remove the length condition
    // consider case of two-word name
    if (isInInv(split[1])) {
        for (var l=0; l<inventory.length; l++) {
            if (split.length == 2) {
                if (split[1].toUpperCase() == inventory[l].name.toUpperCase()) {
                    inventory[l].use();
                }
            }
            else {
                // case if two-word name
                if (inventory[l].name.toUpperCase().includes(split[1].toUpperCase()) && inventory[l].name.toUpperCase().includes(split[2].toUpperCase())) {
                    inventory[l].use();
                }
            }
        }
    }
    else {
        display("I don't have that, so I can't use it.");
    }
  }
  else if (split[0].toUpperCase() == "SAY") {
    // case if alien is in the room
    display("Talking to oneself is a stress coping mechanism; however, it's not the right one for me.");
  }
  else if (split[0].toUpperCase() == "DROP" && split.length >= 2) {
    // remove the length condition
    // remove from inventory
    // display it was dropped
    // add it to the items array of current
    if (!(isInInv(split[1]))) {
        display("I can't drop something I don't have.");
    }
    else {
        drop(itemInInv(split[1]));
    }
  }
  else if (splitHasCommand(split)) {
    var command = findCommand(split);
    command(split);
  }
  else {
      display("I'm not sure what that means.");
  }
}

function filter(split) {
    // add functionality for if the user types two commands separated by 'and'
    for (var i= split.length-1; i>=0; i--) {
        if (split[i].toUpperCase() == 'A' || split[i].toUpperCase() == 'AN' || split[i].toUpperCase() == 'THE') {
            split.splice(i, 1);
        }
    }
    return split;
}

function moveCleaner() {
    var availableRooms = [];
    if (cleaner_monster_location.north != undefined && ((!(cleaner_monster_location.north.locked) && cleaner_monster_location.north.open) || cleaner_monster_location.north.corroded)) {
        availableRooms.push(cleaner_monster_location.north);
    }
    if (cleaner_monster_location.east != undefined && ((!(cleaner_monster_location.east.locked) && cleaner_monster_location.east.open) || cleaner_monster_location.east.corroded)) {
        availableRooms.push(cleaner_monster_location.east);
    }
    if (cleaner_monster_location.south != undefined && ((!(cleaner_monster_location.south.locked) && cleaner_monster_location.south.open) || cleaner_monster_location.south.corroded)) {
        availableRooms.push(cleaner_monster_location.south);
    }
    if (cleaner_monster_location.west != undefined && ((!(cleaner_monster_location.west.locked) && cleaner_monster_location.west.open) || cleaner_monster_location.west.corroded)) {
        availableRooms.push(cleaner_monster_location.west);
    }
    if (availableRooms.length > 0) {
        var newRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
        // move there
        cleaner_monster_location.mods.splice(cleaner_monster_location.mods.indexOf(cleaner_monster), 1);
        cleaner_monster_location = newRoom;
        cleaner_monster_location.mods.push(cleaner_monster);
        // case that the room it moves into was not open (blocked by mircoflora)
        if (cleaner_monster_location.corroded && !(cleaner_monster_location.open)) {
            cleaner_monster_location.open = true;
        }
    }
    else {
        // do nothing
    }
    // console.log(cleaner_monster_location.name);
}

function spotCleaner() {
    if (current.name == "Main Hallway" && cleaner_monster_location.name == "Main Hallway") {
        if (isInInv("scientist's log")) {
            display("I see the cleaner monster scurrying about in the hallway.")
        }
        else {
            display("I see a strange monster scurrying about in the hallway.");
        }
    }
    else if (current == cleaner_monster_location) {
        cleaner_monster.lookAt();
    }
    else {
        // do nothing
    }
}

function handleSubmit() {
  var form = document.getElementById("form");
  var div = document.getElementById("display_input");
  var input = document.getElementById("input");
  var value = input.value;
  display("> " + value);
  var split = value.split(" ");
  // also remove 'a' and 'the' from the array
  split = filter(split);
  for (var i = 0; i < split.length; i++) {
      split[i] = split[i].toUpperCase();
  }
  textParse(split);
  moveCleaner();
  spotCleaner();
  if (hasWon) {
      win();
  }
  // what if the user types an and?
  // maybe... and then no textParse in handleSubmit()
  // filter() {
    // if (split[i].toUpperCase() == 'and') {
        // split.split(" and ")
        // for (all of the indexes in the 'and' split) 
            // textParse(split[j]); 
  while (pNum>8) {
    var first = div.firstChild;
    div.removeChild(first);
    pNum--;
  }
  form.reset();
  input.value = "";
}

var input = document.getElementById("input");
input.addEventListener("keyup", function(event){
    if (event.keyCode == 13) {
        handleSubmit();
        input.value="";
        while (pNum>8) {
            var div = document.getElementById("display_input");
            var first = div.firstChild;
            div.removeChild(first);
            pNum--;
        }
    }
});

// ** TO DO ** if you jump and hit your head too many times, you die humorously
//             also if you take off your spacesuit in space, you die (obviously)
//             also you die 50% each turn in pitch black from the grue
//             have a checkDeath() before textParse() that throws and exception after you die so that textParse() doesnt happen