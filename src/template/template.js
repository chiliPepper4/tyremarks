const fs = require('fs');

module.exports = class TemplateMaker {
  static getTemplate(positions, center) {
    fs.readFile('./template.json', (err, data) => {
      if (err != null) return;
      
    });
  }
};