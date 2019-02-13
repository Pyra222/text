var items = {
    red_rose : {
        id: 'red_rose',
        name: 'Red rose',
        desc: 'Fresh red rose.',
        take: {
            possible: true,
            okMessage: 'You put the rose in your pocket.',
            nokMessage: 'You already have that.',
            action: 'items.red_rose.take.possible=false;'+
                    'printResponse("DON\'T","say");'
        }
    },
    silver_box : {
        id: "silver_box",
        name: "Silver box",
        desc: "Small silver box. It seems to glow dimly in the darkness.",
        take: {
            possible: true,
            okMessage: 'You grab the box and feel, that it is warm. At least warmer, than other things around it.',
            nokMessage: 'It\'s vibrating slightly in your pocket.',
            action: 'items.silver_box.take.possible=false;'+
                    'items.silver_box.desc = "After closer look, you can see a small indentation on the top of the box. You should be able to open it with proper tool.";'
        },
        use: {
            with: {
                old_photo: {
                    possible: true,
                    okMessage: 'You put the box on the photo. Nothing happened.',
                    nokMessage: 'You try putting the box on the photo again. Still, nothing happens.',
                    action: 'items.silver_box.use.with.old_photo.possible = false;'
                },
                default: {
                    possible: true,
                    okMessage: 'What you want to use it with?',
                    nokMessage: 'What you want to use it with?',
                    action: ''
                }
            }
        }
    },
    wooden_door : {
        id: "wooden_door",
        name: "Wooden door",
        desc: "Old, heavy wooden door, there's something written on it.",
        read: {
            possible: true,
            okMessage: 'The sign on the door says: ⑥③①⑧',
            nokMessage: 'It\'s illegible.',
            action: ''
        },
        take: {
            possible: false,
            okMessage: '',
            nokMessage: 'It is too heavy to take it.',
            action: ''
        },
        use: {
            with: {
                rusty_key: {
                    possible: true,
                    okMessage: 'You put the key in the keyhole and turn it. The door is unlocked. Unfortunately, the key breaks in the process and can not be used again.',
                    nokMessage: 'It is already unlocked.',
                    action: 
                        'items.wooden_door.use.with.rusty_key.possible = false;'+
                        'items.wooden_door.use.with.default.possible = true;'+
                        'items.rusty_key = null;'+
                        'room.exits.north = "Room2";'+
                        'checkDirection();'
                },
                default: {
                    possible: false,
                    okMessage: 'You carefully move through the door.',
                    nokMessage: 'It is locked.',
                    action: 'enterRoom("north");'
                }
            }
        }
    },
    rusty_key : {
        id: 'rusty_key',
        name: 'Rusty key',
        desc: 'Old big key. It looks like it will crumble to dust if too much force is used.'
    },
    broken_mirror : {
        id: 'broken_mirror',
        name: 'Broken mirror',
        desc: 'Mirror face is broken, you can\'t see your reflextion.'
    },
    coat : {
        id: 'coat',
        name: 'Coat',
        desc: 'Warm winter coat.'
    },
    pen : {
        id: 'pen',
        name: 'Pen',
        desc: 'Simple black-ink ballpen.'
    },
    old_photo : {
        id: 'old_photo',
        name: 'Old photo',
        desc: 'An old photo of a house. It looks old and ready to collapse at any minute.'
    },
    // TUTORIAL ITEMS
    // ball wall note1 note2 tutorialKey tutorialDoor
    ball: {
        id: "ball",
        name: "Rubber ball",
        desc: "It's a red rubber ball.",
        take: {
            possible: true,
            okMessage: 'You take the ball with you. Little red ball and you are now good friends.',
            nokMessage: 'You already have the ball.',
            action: 'items.ball.take.possible = false;'
        },
        read: {
            possible: false,
            okMessage: '',
            nokMessage: 'No visible symbols are on the ball.',
            action: ''
        },
        use: {
            with: {
                wall: {
                    possible: true,
                    okMessage: "Look what you have done. The wall wasn't very sturdy. There is a hole here now.",
                    nokMessage: "Don't you think it's enough damage for today?",
                    action: 'room.exits.north = "Tutorial room 2";'+
                            'items.ball.use.with.wall.possible = false;'+
                            "items.wall.desc = \"There's a gaping hole where a perfectly good wall once was.\";"+
                            'checkDirection();'+
                            'playSound("./sfx/rock_wall.wav");'
                },
                default: {
                    possible: true,
                    okMessage: 'You play with the ball for a while. So much fun!',
                    nokMessage: '',
                    action: ''
                }
            }
        }
    },
    wall: {
        id: "wall",
        name: "Wall",
        desc: "A perfectly good wall.",
        take: {
            possible: false,
            okMessage: '',
            nokMessage: 'How exactly do you want to take a wall with you?',
            action: ''
        },
        read: {
            possible: true,
            okMessage: 'In the upper right corner of the wall there is a small inscription. It say\'s: "Please, don\'t play with balls around this wall."',
            nokMessage: '',
            action: ''
        },
        use: {
            with: {
                default: {
                    possible: true,
                    okMessage: 'You lean against the wall for a while. You remember your school days.',
                    nokMessage: '',
                    action: ''
                }
            }
        }
    },
    note1: {
        id: "note1",
        name: "Note #1",
        desc: "Note: a piece of paper with some text written on it, maybe try reading it?",
        take: {
            possible: true,
            okMessage: 'You take the note with you.',
            nokMessage: 'You already have the note in your pocket.',
            action: 'items.note1.take.possible = false;'
        },
        read: {
            possible: true,
            okMessage: 'Hello there. This is a tutorial note #1. For starters, why don\'t you try to interact with the ball?',
            nokMessage: '',
            action: ''
        },
        use: {
            with: {
                default: {
                    possible: true,
                    okMessage: '',
                    nokMessage: '',
                    action: 'executeCommand("read Note #1");'
                }
            }
        }
    },
    // ball: {
    //     id: "",
    //     name: "",
    //     desc: "",
    //     take: {
    //         possible: true,
    //         okMessage: '',
    //         nokMessage: '',
    //         action: ''
    //     },
    //     read: {
    //         possible: true,
    //         okMessage: '',
    //         nokMessage: '',
    //         action: ''
    //     },
    //     use: {
    //         with: {
    //             thing: {
    //                 possible: true,
    //                 okMessage: '',
    //                 nokMessage: '',
    //                 action: ''
    //             },
    //             default: {
    //                 possible: true,
    //                 okMessage: '',
    //                 nokMessage: '',
    //                 action: ''
    //             }
    //         }
    //     }
    // },
}
