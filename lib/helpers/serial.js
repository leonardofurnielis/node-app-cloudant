'use strict';

const generate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const serial =
    year.toString().substring(2) +
    month.toString().padStart(2, 0) +
    day.toString().padStart(2, 0) +
    Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, 0);

  return serial;
};

module.exports = generate;
