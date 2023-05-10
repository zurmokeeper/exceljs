// const XmlStream = require('../../../utils/xml-stream');
// const BaseXform = require('../base-xform');
const KeyDataXform = require('./encryptor/key-data-xform');
const KeyEncryptorXform = require('./encryptor/key-encryptor-xform');
const BaseXform = require('./base-xform');
const ListXform = require('./list-xform');

class EncryptorXform extends BaseXform {
  constructor() {
    super();
    this.model = {
      values: [],
      count: 0,
    };
    this.map = {
      keyData: new KeyDataXform(),
      keyEncryptors: new ListXform({
        tag: 'keyEncryptors',
        count: false,
        childXform: new KeyEncryptorXform(),
      }),
    };
  }

  parseOpen(node) {
    // console.log('node--->1', this.parser);
    // console.log('node--->2', node.name);
    // console.log('node--->3', JSON.stringify(node) );
    // if (this.parser) {
    //   this.parser.parseOpen(node);
    //   return true;
    // }
    switch (node.name) {
      case 'encryption':
        return true;
      default:
        this.parser = this.map[node.name];
        // console.log('node--->4', this.parser);
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        return true;
    }
  }

  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }

  parseClose(name) {
    // console.log('node--->name', name, this.parser);
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.values.push(this.parser.model);
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case 'encryption':
        return false;
      case 'dataIntegrity':
          return false;
      case 'keyEncryptors':
            return false;
      default:
        throw new Error(`Unexpected xml node in parseClose: ${name}`);
    }
  }
}

module.exports = EncryptorXform;
