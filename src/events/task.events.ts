import { EventEmitter } from 'events';

// common eventemitter for notifying about task status changes
// used in both controllers and socket.io
export const taskEvents = new EventEmitter();
