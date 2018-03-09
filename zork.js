var inventory = [];
function itemInInv(itemName) {
    for (var i=0; i<inventory.length; i++) {
        if (inventory[i].name.toUpperCase() == itemName.toUpperCase()) {
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
    var inventoryTitle = document.getElementById("inventoryTitle");
    var itemList = document.getElementById("itemList");
    if (inventory.length==0) {
      inventoryTitle.innerHTML="Inventory";
    }
    inventory.push(item);
    var itemStub = document.createElement("li");
    itemStub.innerHTML = item.name;
    itemStub.setAttribute("id", item.name);
    itemList.appendChild(itemStub);
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
        if (nameInSplit.toUpperCase() === inventory[i].name.toUpperCase()) {
            inInv = true;
        }
    }
    return inInv;
}
function drop(item) {
    var itemList = document.getElementById("itemList");
    var itemStub = document.getElementById(item.name);
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
    itemStub.parentNode.removeChild(itemStub);
    inventory.splice(inventory.indexOf(item), 1);
}
function lookAt(split) {
    // something here or in a room or item is causing the pNum to go below
    // how do you look at something with a two-word name?

    // *** TODO ***
    // have case of two-word name
    // be able to look at a Mod
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
            for(var i=0;i<current.items.length;i++){
                if(split[2].toUpperCase() == current.items[i].name.toUpperCase()){
                    // look at the item
                    current.items[i].lookAt();
                }
            }
            for(var j=0;j<inventory.length;j++){
                if(split[2].toUpperCase() == inventory[j].name.toUpperCase()){
                    inventory[j].lookAt();
                }
            }
            for(var k = 0; k<current.mods.length; k++) {
                if(split[2].toUpperCase() == current.mods[k].name.toUpperCase()) {
                    current.mods[k].lookAt();
                }
            }
        }
        else {
            display("I can't see that.");
        }
    }
    else if (split[1].toUpperCase() == "AT" && split.length == 4) {
        if (isInRoom(split[2]) || isInInv(split[2])) {
            // for (var i = 0; i<current.items.length; i++) {
            //     if(current.items[i].name.toUpperCase().includes(split[2].toUpperCase()) && current.items[i].name.toUpperCase().includes(split[3].toUpperCase())) {
            //         current.items[i].lookAt();
            //     }
            // }
            // for (var i = 0; i<inventory.length; i++) {
            //     if(inventory[i].name.toUpperCase().includes(split[2].toUpperCase()) && inventory[i].name.toUpperCase().includes(split[3].toUpperCase())) {
            //         inventory[i].lookAt();
            //     }
            // }
            // for (var i = 0; i<current.mods.length; i++) {
            //     if(current.mods[i].name.toUpperCase().includes(split[2].toUpperCase()) && current.mods[i].name.toUpperCase().includes(split[3].toUpperCase())) {
            //         current.mods[i].lookAt();
            //     }
            // }
            itemInRoom(split[2]).lookAt();
        }
        else {
            display("I can't see that.");
        }
    }
    // else if there is something to look at that has a two-word name
    else if (split[0].toUpperCase() == "READ" && split.length == 2) {
        for(var i=0;i<current.items.length;i++){
            if(split[1].toUpperCase() == current.items[i].name.toUpperCase()){
                // look at the item
                current.items[i].lookAt();
            }
        }
        for(var j=0;j<inventory.length;j++){
            if(split[1].toUpperCase() == inventory[j].name.toUpperCase()) {
                inventory[j].lookAt();
            }
        }
    }
    else if (split[0].toUpperCase() == "READ" && split.length == 3) {
        for (var i = 0; i<current.items.length; i++) {
            if(current.items[i].name.toUpperCase().includes(split[2].toUpperCase()) && current.items[i].name.toUpperCase().includes(split[3].toUpperCase())) {
                current.items[i].lookAt();
            }
        }
        for (var i = 0; i<inventory.length; i++) {
            if(inventory[i].name.toUpperCase().includes(split[2].toUpperCase()) && inventory[i].name.toUpperCase().includes(split[3].toUpperCase())) {
                inventory[i].lookAt();
            }
        }
        for (var i = 0; i<current.mods.length; i++) {
            if(current.mods[i].name.toUpperCase().includes(split[2].toUpperCase()) && current.mods[i].name.toUpperCase().includes(split[3].toUpperCase())) {
                current.mods[i].lookAt();
            }
        }
    }
    else {
        display("I'm not sure what I'm supposed to be looking at.");
    }
}
function go(direction) {
  // add shorthand like gw or gn or ga or gf
  // *** TODO *** check if the grue is there
  var success=true;
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
        else {
            current=current.west;
        }
    }
    else if (direction.toUpperCase() == "GU") {
        display("There is no way up.");
        success=false;
    }
    else if (direction.toUpperCase() == "GD") {
      // grue reference? Carbo bay?
        display("There is no way down.");
        success=false;
    }
    else {
      // error message
      display("I'm not sure where that is.");
      success=false;
    }
  }
  else {
    if (direction == "north" || direction == "fore") {
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
        else {
            current=current.north;
        }
    }
    else if (direction == "east" || direction == "starboard") {
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
        else {
            current=current.east;
        }
    }
    else if (direction == "south" || direction == "aft") {
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
        else {
            current=current.south;
        }
    }
    else if (direction == "west" || direction == "port") {
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
        else {
            current=current.west;
        }
    }
    else if (direction == "up") {
      display("There is no way up");
      success=false;
    }
    else if (direction == "down") {
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
function textParse(split) {
    // instead of requiring with &&, write error messages like "where do i go?" or "what should i take?"
    // ** TODO **: hit, throw, look at <stuff that aren't items>, 
    // consider shorthands
  if (split[0].toUpperCase() == "GO" && split.length == 2) {
      // maybe filter out 'to' from split and check if split[1] is an item name, so that "go to the rations" will output "I'm already in the same room as the rations."
    go(split[1]);
  }
  else if (split[0].length == 2 && split[0].charAt(0).toUpperCase() == 'G'){
    go(split[0]);
  }
  else if (split[0].toUpperCase() == "L" || split[0].toUpperCase() == "LOOK" || split[0].toUpperCase() == "READ"){
    // a lone read will trigger the look room : fix this
    // 'look at slajfl;akjdflkj' just looks at the room
    lookAt(split);
  }
  else if (split[0].toUpperCase() === "TAKE" || split[0].toUpperCase() === "GET" || split[0].toUpperCase() == "GRAB" || split[0].toUpperCase() == "T" && split.length >= 2) {
    if (isInInv(split[1])) {
        display("I already have that.");
    }
    else if (isInRoom(split[1])) {
        take(itemInRoom(split[1]));
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
  else if (split[0].toUpperCase() == "DROP" && split.length == 2) {
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
  // ** TO DO **
  // else if (any of the items or mods have a key in their map that corresponds to split[0])
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
    for (var i=0; i<split.length; i++) {
        if (split[i].toUpperCase() == 'A' || split[i].toUpperCase() == 'AN' || split[i].toUpperCase() == 'THE') {
            split.splice(i, 1);
        }
    }
    return split;
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
  textParse(split);
  // what if the user types an and?
  // maybe... and then no textParse in handleSubmit()
  // filter() {
    // if (split[i].toUpperCase() == 'and') {
        // split.split(" and ")
        // for (all of the indexes in the 'and' split) 
            // textParse(split[j]); 
  while (pNum>9) {
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
        while (pNum>9) {
            var div = document.getElementById("display_input");
            var first = div.firstChild;
            div.removeChild(first);
            pNum--;
        }
    }
});