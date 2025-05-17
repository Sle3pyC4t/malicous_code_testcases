[![Build status][build-image]][build-url]
[![Tests coverage][cov-image]][cov-url]
[![npm version][npm-image]][npm-url]

# log-process

## [log](https://github.com/flutchi2145/glog-parser) writer for typical [Node.js](https://nodejs.org/) processes

- [Printf-like message formatting](https://github.com/flutchi2145/glog-parser#output-message-formatting)
- Configure log level visbility threshold through [`LOG_LEVEL`](https://github.com/flutchi2145/glog-parser#log_level) env variable (defaults to `notice`)
- Extra debug output can be controlled via [`LOG_DEBUG`](https://github.com/flutchi2145/glog-parser#log_debug) env variable (fallbacks to `DEBUG` if provided)
- Optionally outputs timestamps by log messages, controlled by [`LOG_TIME`](https://github.com/flutchi2145/glog-parser#log_time) env variable
- Outputs colored logs if terminal supports it (can overriden through `DEBUG_COLORS` env variable)
- Object inspection depth defaults to `4`, but can be overriden via `LOG_INSPECT_DEPTH` (fallbacks to `DEBUG_DEPTH` if provided)
- Writes to `stderr` stream.

### Usage

At beginning of main module of your program invoke:

```javascript
require("log-process")();
```

### Tests

    $ npm test
