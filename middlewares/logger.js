const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    } else {
     await fsPromises.appendFile(path.join(__dirname, "..", "logs", logFileName), logItem);
    }
  } catch (err) {
    console.log(err);
  }
};

const requestMethods = { GET: "📡 GET", POST: "📝 POST", PUT: "🔄 PUT", DELETE: "❌ DELETE" }

const loggerMiddleware = (req, res, next) => {
  const { method, url, headers: { origin, referer, host }} = req;
  const originOrReferer = origin || referer;
  
  logEvents(`${requestMethods[method]}${url && `\t${url}`}${`\t${originOrReferer || ''}`}${host && `\t${host}`}`, 
  "reqLog.log");

  console.log(`${requestMethods[method]} ${url && `\t${url}`} ${originOrReferer || ''} ${host || ''} `);
next()
};

module.exports = { loggerMiddleware }