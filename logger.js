var winston = require('winston')

var logger = winston.createLogger({
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.simple()
	  ),
	transports: [
		new winston.transports.Console({ format: winston.format.simple() }),
		new winston.transports.File({ filename: './logs/combined.log' })
	]
});
module.exports = logger;
