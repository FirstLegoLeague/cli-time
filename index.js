var dateFormat = require('dateformat');
var meow = require('meow');

var cli = meow({
  pkg: 'package.json',
  help: [
    'Options',
    '  --help          Show this help',
    '  --version       Current version of package',
    '  -m | --mask     Mask that will use to format the date',
    '  -i | --interval Interval to tick, defaults to 1s, should be of the format [<value>](s[ec[ond[s]]]|m[in[ute[s]]]|h[r[s]]|hour[s])',
    '  -u | --utc      Convert local time to UTC time or use `UTC:` prefix in mask',
    '  -g | --gmt      You can use `GMT:` prefix in mask',
    '',
    'Usage',
    '  time -m "HH:MM:ss" -i 1s',
    '  time -m "json" -i',
    '  time -m "longTime" -i 1m',
    ''
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

//json output, eg: {"time":"2015-04-29T23:10:00+0200"}
dateFormat.masks.json = '\'{"time":"\'yyyy-mm-dd\'T\'HH:MM:sso\'"}\'';

var mask = cli.flags.m || cli.flags.mask || dateFormat.masks.default;
var utc = cli.flags.u || cli.flags.utc || false;
var gmt = cli.flags.g || cli.flags.gmt || false;
var interval = cli.flags.i || cli.flags.interval || false;
if (interval === true) {
    interval = '1s';
}
var pattern;

if (interval && (pattern = interval.match(/(\d*)([a-z]+)/))) {
    var value = parseInt(pattern[1],10)||1;
    var unit = pattern[2];
    value = value * (units[unit]||units.s);
    var now = Date.now();
    var rest = value - (now % value);
    tickAfter(value,mask,rest);
}

function tickAfter(timeout,mask,wait) {
    setTimeout(function() {
        var now = Date.now();
        var rest = timeout - (now % timeout);
        tickAfter(timeout,mask,rest);
        console.log(dateFormat(now,mask,utc,gmt));
    },wait);
}
