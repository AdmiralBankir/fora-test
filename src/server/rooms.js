class Rooms {
    constructor() {
        this.rooms = [];
    }

    add(room) {
        this.rooms.push(room);
    }

    get(id) {
        return this.rooms.find(room => room.id === id);
    }

    addUser(user, id) {
        const room = this.get(id);
        room.users.push(user);
        this.add(room);
    }
};

module.exports = function() {
    return new Rooms;
}