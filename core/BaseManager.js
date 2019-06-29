export default class BaseManager {
  constructor() {}

  start(className) {
    this.run(className);
  }

  async run(object) {
    await object.start();
    process.nextTick(() => {
      this.start(object);
    });
  }
}
