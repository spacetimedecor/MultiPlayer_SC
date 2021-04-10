import {
  ClientGreetingPayload,
  message,
  MESSAGES,
  newMessage,
  ServerGreetingPayload,
  ServerStatusPayload,
} from './messages';
import { myID, setID } from './localStorage';
import socket from './socket';

export const onMessage = (aMessage: string): void => {
  const interpretMessage: message = JSON.parse(aMessage);
  switch (interpretMessage.type) {
    case MESSAGES.SERVER_STATUS:
      onServerStatus(interpretMessage.payload as ServerStatusPayload);
      break;
    case MESSAGES.SERVER_GREETING:
      onServerGreeting(interpretMessage.payload as ServerGreetingPayload);
      break;
    default:
      onUnknownMessage();
      break;
  }
};

export const onServerStatus = (payload: ServerStatusPayload): void => {
  console.log(MESSAGES.SERVER_STATUS);
  socket.send(newMessage(MESSAGES.CLIENT_STATUS, { id: myID() }));
};

export const onServerGreeting = (payload: ServerGreetingPayload): void => {
  if (payload.id) {
    setID(payload.id);
  }
  console.log(MESSAGES.SERVER_GREETING, payload.id);
  socket.send(newMessage(MESSAGES.CLIENT_GREETING, { id: myID() }));
};

export const onUnknownMessage = (): void => {
  console.log('Received unknown message');
};
