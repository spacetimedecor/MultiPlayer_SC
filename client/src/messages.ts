export type messagePayloadTypes = ServerGreetingPayload | ClientGreetingPayload;

export type message = {
  type: MESSAGES;
  payload: messagePayloadTypes;
};

export enum MESSAGES {
  SERVER_GREETING = 'Hello from server!',
  CLIENT_GREETING = 'Hello from client!',
}

export type ServerGreetingPayload = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ClientGreetingPayload = {};

export function newMessage(
  type: MESSAGES,
  payload: messagePayloadTypes
): string {
  switch (type) {
    case MESSAGES.SERVER_GREETING:
      const typedPayload = payload as ServerGreetingPayload;
      return JSON.stringify({
        type: MESSAGES.SERVER_GREETING,
        payload: {
          id: typedPayload.id,
        } as ServerGreetingPayload,
      } as message);
    default:
      return '';
  }
}
