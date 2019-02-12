var map = {
    name: 'CHAPTER 1: <span style="color: rgb(123, 175, 224)">HOSPITAL<span>',
    icon: '.\/img\/img3.png',
    desc: 'Only map in this game. I\'ll think about adding more maps in the future.',
    rooms: [
        {
            name: 'Room1',
            desc: 'This is first test room. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            items: [
                items.red_rose,
                items.rusty_key,
                items.broken_mirror,
                items.silver_box,
                items.wooden_door
            ],
            exits: {
                north: null,
                south: null,
                east: null,
                west: null
            }
        },
        {
            name: 'Room2',
            desc: 'This is second test room.',
            items: [
            ],
            exits: {
                north: null,
                south: 'Room1',
                east: null,
                west: null
            }
        }
    ]
}