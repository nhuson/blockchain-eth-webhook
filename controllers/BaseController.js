export default class BaseController {
  constructor() {
    this.model = "";
  }

  async create(data) {
    return this.model.create(data);
  }

  async update({ data, option }) {
    return this.model.updateOne(option, data);
  }

  async delete(option) {
    return this.model.remove(option);
  }

  async findAll() {
    return this.model.find({});
  }

  async findOne(option) {
    return this.model.findOne(option);
  }

  call(object, method) {
    return object[method];
  }
}
