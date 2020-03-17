module.exports = {
  HOST : "localhost",
  USER : "root",
  PASSWORD : "lionheart",
  DB : "workinghours",
  dialect : "mysql",
  pool : {
    max : 5,
    min : 0,
    acquire : 50000,
    idle : 12000
  }
};
