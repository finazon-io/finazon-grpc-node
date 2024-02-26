import Handlebars from "handlebars";

const HandlebarsWrapper = Handlebars;

HandlebarsWrapper.registerHelper("snakeCase", function (value = '') {
  return (
    value[0].toLowerCase() +
    value
      .slice(1, value.length)
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  );
});

HandlebarsWrapper.registerHelper("firstLower", function (value = '') {
  const [first, ...rest] = value;

  return [first.toLowerCase(), ...rest].join("");
});

export default HandlebarsWrapper;
