import fs from "fs";
import ejs from "ejs";

export const writeFile = (templatePath, path, center, positions) => {
  const template = fs.readFileSync(templatePath + '/app/template.ejs', 'utf-8');
  const content = ejs.render(template, {
    center: center,
    positions: positions,
  });
  fs.writeFile(path, content, (error) => {
    if (error != null) {
      alert(error);
      return;
    } else alert(path + ' was successfully saved!');
  });
};
