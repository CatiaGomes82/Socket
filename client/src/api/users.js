// users
export const add = (name, cb, socket) => socket.emit('addUser', name, cb); 