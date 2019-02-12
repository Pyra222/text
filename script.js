var player, inventory, room, log, index = [];

inventory = {
    items: [
        items.coat,
        items.pen,
        items.old_photo
    ],
    list: function () {
        var response = "";
        if (this.items.length > 0) {
            printResponse('You have:');
            for (var i = 0; i < this.items.length; i++) {
                response += '<span class="item" data-name="' + this.items[i].name + '">' + this.items[i].name + '</span>, ';
            }
            response = response.slice(0, -2);
            printResponse(response);
        } else {
            printResponse('You have nothing.');
        }
    }
}
log = {
    entries: [],
    index: 0,
    add: function (entry) {
        this.entries.push({
            index: ++this.index,
            text: entry,
            removed: false
        });
        printResponse('Logbook entry added.');
    },
    remove: function (number) {
        number = parseInt(number);
        if (this.entries[number - 1]) {
            this.entries[number - 1].removed = true;
            printResponse('Scratch that.');
        } else {
            printResponse('You can\'t do that.');
        }
    },
    list: function () {
        if (this.entries.length > 0) {
            printResponse('Logbook entries:');
            for (var i = 0; i < this.entries.length; i++) {
                if (this.entries[i].removed) {
                    printResponse(this.entries[i].index + ': <s>' + this.entries[i].text + '</s>');
                } else {
                    printResponse(this.entries[i].index + ': ' + this.entries[i].text);
                }
            }
        } else {
            printResponse('No entries in logbook.');
        }
    }
}

function init() {
    room = map.rooms[0];
    // if(!window.localStorage.getItem('save')){
    //     save();
    // }
    // load();
    $('#command').focus();
    createIndex();
    printResponse('', 'special');
    printResponse('⎯⎯ ' + map.name + ' ⎯⎯', 'special');
    printResponse('<br><img src="'+map.icon+'"><br><br>', 'special');
    printResponse(map.desc+'<br><br>', 'special');
    executeCommand('look around');
    executeCommand('inv');
    printResponse('⎯⎯ 👁 ⎯⎯', 'special');
    checkDirection();
}
function save() {
    var state = {}
    state.logItems = log.items;
    state.inventoryItems = inventory.items;
    state.map = map;
    state.items = items;
    state.currentRoom = room.name;
    var stateString = JSON.stringify(state);
    window.localStorage.setItem('save', stateString);
}
function load() {
    var state = JSON.parse(window.localStorage.getItem('save'));
    $('#screen').empty();
    log.items = state.logItems;
    inventory.items = state.inventoryItems;
    map = state.map;
    items = state.items;
    room = map.rooms.find(r => r.name == state.currentRoom);
    window.localStorage.removeItem('save');
}
function createIndex() {
    index = [];
    for (var i = 0; i < room.items.length; i++) {
        index.push(room.items[i]);
    }
    for (var i = 0; i < inventory.items.length; i++) {
        index.push(inventory.items[i]);
    }
}
function checkDirection() {
    $('.direction').removeClass('possible');
    if (room.exits.north) $('#north').addClass('possible');
    if (room.exits.south) $('#south').addClass('possible');
    if (room.exits.east) $('#east').addClass('possible');
    if (room.exits.west) $('#west').addClass('possible');
}
function enterRoom(direction) {
    if (room.exits[direction]) {
        room = map.rooms.find(r => r.name == room.exits[direction]);
        createIndex();
        checkDirection();
        printResponse('⎯⎯ 👁 ⎯⎯', 'special');
        executeCommand('look around');
        printResponse('⎯⎯ 👁 ⎯⎯', 'special');
    } else {
        printResponse('You can\'t go that way.');
    }
    $('#command').focus();
}
function printResponse(response, type) {
    var $screen = $('#screen');
    if (!type) {
        var $entry = $('<div class="entry game">- ' + response + '</div>');
    } else if (type == "debug") {
        var $entry = $('<div class="entry debug">. ' + response + '</div>');
    } else if (type == "error") {
        var $entry = $('<div class="entry error">X ' + response + '</div>');
    } else if (type == "special") {
        var $entry = $('<div class="entry special">' + response + '</div>');
    } else if (type == "say") {
        var $entry = $('<div class="entry special say">' + response + '</div>');
    }
    $screen.append($entry);
    updateScroll();
}
function executeCommand(command) {
    try {
        command = command.toLowerCase();
        command = command.replace(/,|\./g, '');
        for (var i = 0; i < index.length; i++) {
            command = command.replace(index[i].name.toLowerCase(), index[i].id);
        }
        var commandArray = command.split(' ');

        var unwantedWords = ['on', 'at', 'the', 'a', 'an', 'with', 'in', 'go'];

        for (var i = 0; i < unwantedWords.length; i++) {
            if (commandArray.indexOf(unwantedWords[i]) > -1) {
                commandArray.splice(commandArray.indexOf(unwantedWords[i]), 1);
            }
        }

        var action = commandArray[0];
        var item1 = commandArray[1];
        var item2 = commandArray[2];

        switch (action) {
            case 'help':
            case '?': {
                printResponse('Available commands:', 'debug');
                printResponse('inventory (inv, i)', 'debug');
                printResponse('examine [item]  (look, l)', 'debug');
                printResponse('drop [item]     (d)', 'debug');
                printResponse('read [item]     (r)', 'debug');
                printResponse('get [item]      (g, take, t)', 'debug');
                printResponse('use [item], use [item] [on/with] [item]      (u)', 'debug');
                printResponse('logbook [text], logbook remove [index]  (log, x)', 'debug');
                printResponse('[go] north/south/east/west (n/s/e/w)', 'debug');
                printResponse('save', 'debug');
            } break;

            case 'logbook':
            case 'log':
            case 'x': {
                if (item1 && item1 == 'remove') {
                    log.remove(item2);
                } else if (item1) {
                    log.add(command.split('log')[1]);
                } else {
                    log.list();
                }
            } break;

            case 'inv':
            case 'inventory':
            case 'i': {
                inventory.list();
            } break;

            case 'look':
            case 'l':
            case 'examine': {
                if (item1 == "room" || item1 == "around") {
                    printResponse(room.desc);
                    var response = "";
                    if (room.items.length > 0) {
                        printResponse('You can see:');
                        for (var i = 0; i < room.items.length; i++) {
                            response += '<span class="item" data-name="' + room.items[i].name + '">' + room.items[i].name + '</span>, ';
                        }
                        response = response.slice(0, -2);
                        printResponse(response);
                    } else {
                        printResponse('There is nothing of interest here.');
                    }
                    return;
                }
                var item = index.find(item => item.id == item1);
                if (item) {
                    printResponse(item.desc);
                } else {
                    printResponse('You can\'t see that here.');
                }
            } break;

            case 'drop':
            case 'd': {
                var item = index.find(item => item.id == item1);
                if (item && inventory.items.find(e => e.id == item.id)) {
                    room.items.push(item);
                    inventory.items.splice(inventory.items.findIndex(e => e.id == item1), 1);
                    printResponse('You dropped ' + item.name);
                    createIndex();
                } else {
                    printResponse('You can\'t drop what you don\'t have.');
                }
            } break;

            case 'read':
            case 'r': {
                var item = index.find(item => item.id == item1);
                if (item && item.read.possible) {
                    printResponse(item.read.okMessage);
                    executeAction(item.read.action);
                } else if (item) {
                    printResponse(item.read.nokMessage);
                } else {
                    printResponse('There is nothing written there.');
                }
            } break;

            case 'get':
            case 'g':
            case 'take':
            case 't': {
                var item = index.find(item => item.id == item1);
                if (item && item.take.possible) {
                    inventory.items.push(item);
                    room.items.splice(room.items.findIndex(e => e.id == item1), 1);
                    printResponse(item.take.okMessage);
                    executeAction(item.take.action);
                } else if (item) {
                    printResponse(item.take.nokMessage);
                } else {
                    printResponse('You can\'t see that here.');
                }
                createIndex();
            } break;

            case 'u':
            case 'use': {
                var item_a_i = index.findIndex(item => item.id == item1);
                var item_b_i = index.findIndex(item => item.id == item2);
                var item_a = index[item_a_i];
                var item_b = index[item_b_i];
                if (item_a && item_b) {
                    if (item_a.use.with[item_b.id] && item_a.use.with[item_b.id].possible) {
                        printResponse(item_a.use.with[item_b.id].okMessage);
                        executeAction(item_a.use.with[item_b.id].action);
                    } else if (item_a.use.with[item_b.id]) {
                        printResponse(item_a.use.with[item_b.id].nokMessage);
                    } else {
                        printResponse('You can\'t do that.');
                    }
                } else if (item_a) {
                    if (item_a.use.with.default.possible) {
                        printResponse(item_a.use.with.default.okMessage);
                        executeAction(item_a.use.with.default.action);
                    } else {
                        printResponse(item_a.use.with.default.nokMessage);
                    }
                } else if (item_b) {
                    printResponse('You can\'t use that.');
                } else {
                    printResponse('You can\'t use that.');
                }
                createIndex();
            } break;

            case 'n':
            case 'north': {
                enterRoom('north');
            } break;

            case 's':
            case 'south': {
                enterRoom('south');
            } break;

            case 'e':
            case 'east': {
                enterRoom('east');
            } break;

            case 'w':
            case 'west': {
                enterRoom('west');
            } break;

            case 'save': {
                printResponse(save(), 'debug');
            } break;

            case 'delete': {
                window.localStorage.removeItem('save');
                window.location.reload();
            } break;

            default: {
                printResponse('I don\'t understand...');
            }
        }
    } catch (e) {
        printResponse('I don\'t understand...');
        console.log(e.message);
    }
}
function executeAction(action) {
    eval(action);
}
function updateScroll() {
    var $screen = $('#screen');
    $screen[0].scrollTop = $screen[0].scrollHeight;
}

$('#command').on('keypress', function (e) {
    if (e.which == 13 && $(this).val()) {
        var command = $(this).val();
        var $screen = $('#screen');
        var $entry = $('<div class="entry player">> ' + command + '</div>');
        $screen.append($entry);
        updateScroll();
        executeCommand(command);
        $(this).val('');
    }
});
$(document).on('click', '.item', function (e) {
    var command = 'examine ' + this.dataset.name;
    var $screen = $('#screen');
    var $entry = $('<div class="entry player">> ' + command + '</div>');
    $screen.append($entry);
    updateScroll();
    executeCommand(command);

    $('#command').focus();
});
$(window).on("beforeunload", function () {
    save();
});

// Start things up
init();