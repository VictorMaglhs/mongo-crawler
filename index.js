var CronJob = require("cron").CronJob
var exec = require("child_process").execFile
var fs = require("fs")
var moment = require("moment")
moment.locale("pt-br")

String.prototype.replaceAll =
  String.prototype.replaceAll ||
  function (needle, replacement) {
    return this.split(needle).join(replacement)
  }

var dir = "./backups"

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

exec("C:/Program Files/MongoDB/Server/4.4/bin/mongodump")

var job = new CronJob(
  "00 04 * * *",
  () => {
    const execBackup = async () => {
      try {
        console.log("Executando backup....")
        fs.mkdirSync(process.cwd() + `/backups/${moment().format("L").toString().replaceAll("/", "")}_${moment().format("LTS").toString().replaceAll(":", "")}`)
        exec(`C:/Program Files/MongoDB/Server/4.4/bin/mongodump`)
        console.log("Sucesso")
      } catch (err) {
        if (err) throw err
      }
    }
    execBackup()
  },
  -null,
  true,
  "America/Sao_Paulo"
)
job.start()
