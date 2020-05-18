function convert2Radian(degree) {
  return degree / 180 * Math.PI;
}

function convert2Degree(radian) {
  return radian * 180 / Math.PI;
}

function calculate(history) {
  let x = 0;
  let y = 0;
  let z = 0;
  for (const el of history) {
    let lat = convert2Radian(el.lat);
    let lng = convert2Radian(el.lng);
    // convert to Cartesian cordinates
    x += Math.cos(lat) * Math.cos(lng);
    y += Math.cos(lat) * Math.sin(lng);
    z += Math.sin(lat);
  }
  x /= history.length;
  y /= history.length;
  z /= history.length;
  return [convert2Degree(Math.atan2(z, Math.sqrt(x * x + y * y))), convert2Degree(Math.atan2(y, x))];
}

export const getGeocenter = history => {
  const geocenter = history.length === 0 ? [35.6804, 139.7690] : calculate(history);
  return geocenter;
};
