const asyncMiddleware = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default handlerDef => {
  const [handlerFile, handlerMethod] = handlerDef.split("@");
  const classHandler = require(`../controllers/${handlerFile}`).default;
  const object = new classHandler();
  return asyncMiddleware(object.call(object, handlerMethod));
};
