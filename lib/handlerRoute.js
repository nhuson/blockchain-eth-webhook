const asyncMiddleware = ({ object, method }) => (req, res, next) =>
  Promise.resolve(object[method](req, res, next)).catch(next);

export default handlerDef => {
  const [handlerFile, handlerMethod] = handlerDef.split("@");
  const classHandler = require(`../controllers/${handlerFile}`).default;
  const object = new classHandler();
  return asyncMiddleware({ object, method: handlerMethod });
};
