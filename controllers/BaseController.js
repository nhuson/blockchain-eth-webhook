export default class BaseController {
  constructor() {
    this.model;
  }

  Afunction() {
    return "2";
  }

  create(data) {
    return this.model.create(data);
  }

  update({ data, option }) {
    return this.model.updateOne(option, data);
  }

  delete(option) {
    return this.model.remove(option);
  }

  findAll() {
    return this.model.find({});
  }

  findOne(option) {
    return this.model.findOne(option);
  }
}
