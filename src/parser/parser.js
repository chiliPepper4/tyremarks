import fitParser from "fit-file-parser";

export const getParser = () => {
  return new fitParser({
    force: true,
    speedUnit: 'km/h',
    lengthUnit: 'm',
    temperatureUnit: 'celsius',
    elapsedRecordField: true,
    mode: 'list',
  });
}
