// receive event
export const join = (name, cb, socket) => socket.emit('join', name, cb); 

// emit event