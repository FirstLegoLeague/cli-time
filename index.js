var dateFormat = require('dateformat');
var meow = require('./node_modules/dateformat/node_modules/meow');

var cli = meow({
  pkg: 'package.json',
  help: [
    // 'Options',
    // '  --help          Show this help',
    // '  --version       Current version of package',
    // '  -d | --date     Date that want to format (Date object as Number or String)',
    // '  -m | --mask     Mask that will use to format the date',
    // '  -u | --utc      Convert local time to UTC time or use `UTC:` prefix in mask',
    // '  -g | --gmt      You can use `GMT:` prefix in mask',
    // '',
    // 'Usage',
    // '  dateformat [date] [mask]',
    // '  dateformat "Nov 26 2014" "fullDate"',
    // '  dateformat 1416985417095 "dddd, mmmm dS, yyyy, h:MM:ss TT"',
    // '  dateformat 1315361943159 "W"',
    // '  dateformat "UTC:h:MM:ss TT Z"',
    // '  dateformat "longTime" true',
    // '  dateformat "longTime" false true',
    // '  dateformat "Jun 9 2007" "fullDate" true',
    // '  date +%s | dateformat',
    // ''
  ].join('\n')
});

var units = {
    s: 1000,
    sec: 1000,
    second: 1000,
    seconds: 1000,
    m: 60000,
    min: 60000,
    minute: 60000,
    minutes: 60000,
    h: 360000,
    hr: 360000,
    hrs: 360000,
    hour: 360000,
    hours: 360000
};

var mask = cli.input[1] || cli.flags.m || cli.flags.mask || dateFormat.masks.default;
var tick = cli.flags.t || cli.flags.tick || false;
if (tick === true) {
    tick = '1s';
}
var pattern;

if (tick && (pattern = tick.match(/(\d*)([a-z]+)/))) {
    // console.log(pattern);
    var value = parseInt(pattern[1],10)||1;
    var unit = pattern[2];
    value = value * (units[unit]||units.s);

    tock(value,mask);
}

function tock(timeout,mask) {
    var date = Date.now();
    console.log(dateFormat(date,mask));
    setTimeout(function() {
        tock(timeout,mask);
    },timeout);
}


// console.log(dateformat,cli.input);