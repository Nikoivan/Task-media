import formatCoords from "../src/js/components/formatcoords";

const geoExpList = [
  ["[51.50851, -0.12572]", "51.50851, -0.12572"],
  ["51.50de851, -0.12572", null],
  ["51.50851,    -0.12572", "51.50851, -0.12572"],
  ["51.50851,-0.12572", "51.50851, -0.12572"],
];

const testGeoList = test.each(geoExpList);

testGeoList("Test for method formatCoords by %q", (value, result) => {
  expect(formatCoords(value)).toBe(result);
});

/*test("Test for correct value in method formatCoords", () => {
  const result = formatCoords("[51.50851, -0.12572]");
  expect(result).toBe("51.50851, -0.12572");
});

test("Test for incorrect value in method formatCoords", () => {
  const result = formatCoords("[51.5d0851, -0.12572]");
  expect(result).toBe(null);
});*/
