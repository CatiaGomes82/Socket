import openSocket from 'socket.io-client';
import { add } from './users';
import { join } from './rooms';

const socket = openSocket('http://localhost:5000/socket');

// users
export const addUser = (name, cb) => add(name, cb, socket);

// rooms
export const joinRoom = (name, cb) => join(name, cb, socket);

