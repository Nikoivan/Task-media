import formatCoords from "../src/js/components/formatcoords";

const geoExpList = [
  ["[51.50851, -0.12572]", "51.50851, -0.12572"],
  ["51.50de851, -0.12572", null],
  ["51.50851,    -0.12572", "51.50851, -0.12572"],
  ["51.50851,-0.12572", "51.50851, -0.12572"],
];

test.each(geoExpList)("for method formatCoords by %q", (value, result) => {
  expect(formatCoords(value)).toBe(result);
});
