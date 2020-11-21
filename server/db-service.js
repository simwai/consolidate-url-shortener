const mysql2 = require('mysql2')
const db = require('mysql-promise')();
const shortid = require('shortid')

class DbService {
  constructor() {
    db.configure({
      "host": "127.0.0.1",
      "user": "root",
      "password": "",
      "database": "consolidate_url_shortener",
    }, mysql2);
  }

  findUrlForAlias(alias) {
    const sql = 'select * from url left join alias on url.id = alias.url_id where alias = ?'
    const inserts = [alias]

    return db.query(sql, inserts)
  }

  async createAliasForUrl(url, alias) {
    if (!alias) alias = shortid.generate()
    // TODO regenerate if alias already exists
    // TODO check if alias is longer than 10 characters, send error reponse

    const sql1 = 'select id from url order by id desc limit 1'
    const [lastUrlId] = await db.query(sql1)

    const urlId = lastUrlId.length === 0 ? 0 : lastUrlId[0].id + 1

    const sql2 = 'insert ignore into url values(?, ?)'
    const inserts2 = [urlId, url]
    await db.query(sql2, inserts2)

    const sql3 = 'select id from alias order by id desc limit 1'
    const [lastAliasId] = await db.query(sql3)

    const aliasId = lastAliasId.length === 0 ? 0 : lastAliasId[0].id + 1
    
    const sql4 = 'insert ignore into alias values(?, ?, ?)'
    const inserts4 = [aliasId, alias, urlId]

    return db.query(sql4, inserts4)
  }

  findPasswordForUsername(username) {
    const sql = 'select password from credential where username = ?'
    const inserts = [username]
    
    return db.query(sql, inserts)
  }

  // insertTest(username, password) {
  //   const sql = 'insert into credential (username, password, id) values (?, ?, 0)'
  //   const inserts = [username, password]

  //   return db.query(sql, inserts)
  // }
}

module.exports = {
  DbService
}