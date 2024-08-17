import { MESSAGE_FROM, MessageData, MessageFrom } from "./const";

export const MessageSender =
  <F extends keyof typeof MESSAGE_FROM>(from: F) =>
  <T extends MessageFrom[F]>(type: T, data: MessageData[T]) => ({
    from,
    type,
    data,
  });

export const MessageListener = <F extends keyof typeof MESSAGE_FROM>(
  message: any,
  from: F,
) => ({
  on: <T extends MessageFrom[F]>(type: T, fn: (data: MessageData[T]) => void) =>
    message.from === from && message.type === type && fn(message.data),
});
