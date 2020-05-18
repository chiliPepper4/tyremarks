function convert2Radian(degree) {
  return degree / 180 * Math.PI;
}

function convert2Degree(radian) {
  return radian * 180 / Math.PI;
}

export const calculateCenter = history => {
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
  x = x / history.length;
  y = y / history.length;
  z = z / history.length;
  return [convert2Degree(Math.atan2(z, Math.sqrt(x * x + y * y))), convert2Degree(Math.atan2(y, x))];
};
