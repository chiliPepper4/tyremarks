import fs from "fs";
import ejs from "ejs";

export const writeFile = (templatePath, params) => {
  const template = fs.readFileSync(templatePath + '/app/template.ejs', 'utf-8');
  const content = ejs.render(template, {
    center: params.center,
    positions: params.positions
  });
  fs.writeFile(params.filePath, content, (error) => {
    if (error != null) {
      alert(error);
      return;
    } else alert(params.filePath + ' was successfully saved!');
  });
};
