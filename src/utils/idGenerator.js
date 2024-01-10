function idGenerator() {
  return String(Math.round(Math.random() * 100000000));
}

module.exports = idGenerator;
