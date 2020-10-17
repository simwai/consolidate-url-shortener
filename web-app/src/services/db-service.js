
const db = require('mysql-promise')()

function getUrlAliasById (id) {
    const sql = 'select * from url_alias where url_alias = ?'
    const inserts = [id]
    return db.query(sql, inserts)
}

function setUrlAlias (url, alias) {
    const sql = 'insert into url_alias (null, ?, ?)'
    const inserts = [url, alias]
    return db.query(sql, inserts)
}

function init () {
    const options = {
      host: "127.0.0.1:3306",
      user: "root",
      password: "root",
      database: "consolidate_url_shortener"
    }
  
    db.configure(options)
}

init();

module.exports = {
    getUrlAliasById,
    setUrlAlias
}