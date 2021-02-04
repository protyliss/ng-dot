export class Timer {
  static after(handler, callback, timeout);
  static after(handler_or_callback, callback_or_timeout, timeout?) {
    let handler;
    let callback;

    if (timeout === undefined) {
      callback = handler_or_callback;
      timeout = callback_or_timeout;
    } else {
      handler = handler_or_callback;
      callback = callback_or_timeout;
    }

    if (handler) {
      clearTimeout(handler);
    }

    return setTimeout(callback, timeout);
  }
}
