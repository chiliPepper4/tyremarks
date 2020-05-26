import L from 'leaflet';

export const getMap = () => {
  return L.map('map', {
    scrollWheelZoom: false,
    zoom: 9,
    zoomControl: true,
  });
};

export const getTileLayerOSM = () => {
  return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    detectRetina: false,
    maxNativeZoom: 18,
    maxZoom: 18,
    minZoom: 0,
    noWrap: false,
    opacity: 1,
    subdomains: "abc",
    tms: false
  });
}

export const getTileLayerTerrain = () => {
  return L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
    attribution: 'Map tiles by \u003ca href=\"http://stamen.com\"\u003eStamen Design\u003c/a\u003e, under \u003ca href=\"http://creativecommons.org/licenses/by/3.0\"\u003eCC BY 3.0\u003c/a\u003e. Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://creativecommons.org/licenses/by-sa/3.0\"\u003eCC BY SA\u003c/a\u003e.',
    detectRetina: false,
    maxNativeZoom: 18,
    maxZoom: 18,
    minZoom: 0,
    noWrap: false,
    opacity: 1,
    subdomains: "abc",
    tms: false
  });
}

export const clearMap = (map) => {
  for (const i in map._layers) {
    if (map._layers[i]._path != undefined) {
      try {
        map.removeLayer(map._layers[i]);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export const getPolyLine = (positions) => {
  return L.polyline(
    positions, {
      "bubblingMouseEvents": true,
      "color": "red",
      "dashArray": null,
      "dashOffset": null,
      "fill": false,
      "fillColor": "red",
      "fillOpacity": 0.2,
      "fillRule": "evenodd",
      "lineCap": "round",
      "lineJoin": "round",
      "noClip": false,
      "opacity": 1.0,
      "smoothFactor": 1.0,
      "stroke": true,
      "weight": 3
    });
};
