export const getGPSdata = (records) => {
  let points = [];
  for (const element of records) {
    if (element.position_lat && element.position_long)
      points.push([element.position_lat, element.position_long]);
  }
  return points;
};

export const getAllhistory = (activities) => {
  const history = [];
  for (const positionArray of activities)
    for (const element of positionArray)
      if (Array.isArray(element))
        history.push({
          lat: element[0],
          lng: element[1]
        });
  return history;
};
