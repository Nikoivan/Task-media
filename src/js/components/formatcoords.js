export default function formatCoords(value) {
  if (!/[0-9. -,[\]]{8,}/.test(value)) {
    return null;
  }

  let formattedValue = value;

  formattedValue = formattedValue.replace(/^\[/, "");
  formattedValue = formattedValue.replace(/\]$/, "");
  formattedValue = formattedValue.replace(/,/, ", ");
  formattedValue = formattedValue.replace(/,[ ]{2,}/, ", ");

  console.log(formattedValue);

  if (!/^-?[0-9]+\.+[0-9]+, -?[0-9]+\.[0-9]+/.test(formattedValue)) {
    return null;
  }
  return formattedValue;
}
