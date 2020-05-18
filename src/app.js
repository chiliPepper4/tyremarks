import "./stylesheets/main.css";
import "./helpers/context_menu.js";
import "./helpers/external_links.js";
import path from "path";

import {
  remote
} from "electron";
import fs from "fs";
import env from "env";

import {
  getParser
} from "./parser/parser";

import {
  getMap,
  clearMap,
  getTileLayerOSM,
  getPolyLine,
} from "./maphandler/maphandler";

import {
  getGPSdata,
  getAllhistory
} from "./datahandler/datahandler";

import {
  calculateCenter
} from "./calculator/calculator";

import {
  writeFile
} from './filehandler/filehandler';

const activities = new Map();
const map = getMap();
const tileLayer = getTileLayerOSM();
const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

document.querySelector("#app").style.display = "block";
document.querySelector("#os").innerHTML = osMap[process.platform];
document.querySelector("#env").innerHTML = env.name;
document.querySelector("#electron-version").innerHTML = process.versions.electron;

document.querySelector("#importFile").addEventListener('click', async () => {
  const window = remote.BrowserWindow.getFocusedWindow();
  const files = await remote.dialog.showOpenDialog(
    window, {
      properties: ['openFile', 'multiSelections'],
      title: 'UPLOAD',
      filters: [{
        name: 'FIT',
        extensions: ['fit']
      }, {
        name: 'TEXT',
        extensions: ['txt', 'tsv', 'csv']
      }, {
        name: 'ALL FILES',
        extensions: ['*']
      }]
    });
  if (files.canceled == true) return;
  else if (files !== undefined) {
    const filePaths = files.filePaths;
    if (filePaths.length == 1)
      alert(filePaths.length + ' file imported.\n');
    else
      alert(filePaths.length + ' files imported.\n');
    readFile(filePaths.toString().split(','));
  }
});

async function readFile(filePaths) {
  activities.clear();
  clearMap(map);
  const promises = new Array(filePaths.length);
  const fparser = getParser();
  for (const filePath of filePaths) {
    if (filePath == 'false' || filePath === undefined) continue;
    if (path.extname(filePath) === '.fit') promises.push(parseContent(filePath, fparser));
  }
  await Promise.all(promises);
  document.querySelector("#preview").innerHTML = Array.from(activities.keys());
  const center = calculateCenter(getAllhistory(activities.values()));
  document.querySelector("#geocenter").innerHTML = center;

  map.setView(center, 14);
  tileLayer.addTo(map);

  for (const [key, value] of activities.entries()) {
    getPolyLine(value).addTo(map);
  }
}

function parseContent(filePath, parser) {
  return new Promise(async (resolve, reject) => {
    await fs.readFile(filePath, (err, content) => {
      if (err != null) {
        alert(err);
        return;
      }
      parser.parse(content, (error, data) => {
        if (error) reject(error);
        else {
          activities.set(filePath, getGPSdata(data.records));
          resolve();
        }
      });
    });
  });
}

document.querySelector("#exportFile").addEventListener('click', async () => {
  if (activities.size === 0) alert('There\'s nothing to Export!');
  else exportFile();
});

async function exportFile() {
  const window = remote.BrowserWindow.getFocusedWindow();
  const file = await remote.dialog.showSaveDialog(
    window, {
      defaultPath: 'myactivities.html',
      properties: ['openFile'],
      showsTagField: true,
      filters: [{
        name: 'ALL FILES',
        extensions: ['*']
      }, {
        name: 'XHTML',
        extensions: ['html']
      }, {
        name: 'FIT',
        extensions: ['fit']
      }]
    });
  if (file.filePath) {
    const center = document.querySelector("#geocenter").textContent;
    writeFile(remote.app.getAppPath(), file.filePath, center, activities.values());
  }
}
