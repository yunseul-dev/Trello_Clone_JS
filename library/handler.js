let eventHandlers = [];

const handler = {
  setEventHandler(eventType, callback) {
    eventHandlers.push({ [eventType]: callback });
  },

  bindEventHandler($root) {
    eventHandlers.forEach(eventHandler => {
      for (const [key, value] of Object.entries(eventHandler)) {
        $root.addEventListener(key, value);
      }
    });
  },

  removeEventHandler($root) {
    eventHandlers.forEach(eventHandler => {
      for (const [key, value] of Object.entries(eventHandler)) {
        $root.removeEventListener(key, value);
      }
    });
    eventHandlers = [];
  },
};

export default handler;
