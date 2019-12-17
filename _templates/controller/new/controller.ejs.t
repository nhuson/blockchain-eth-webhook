---
to: controllers/<%= name %>.js
---
import BaseController from "./BaseController";

class <%= name %> extends BaseController {
  constructor(props) {
    super(props);
  }

}

export default <%= name %>;
