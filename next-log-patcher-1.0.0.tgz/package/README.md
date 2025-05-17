[![Build status][build-image]][build-url]
[![Tests coverage][cov-image]][cov-url]
[![npm version][npm-image]][npm-url]

# next-log-patcher

## [next-log-patcher](https://github.com/loveryon/next-log-patcher/) writer for typical [Node.js](https://nodejs.org/) processes

- [Printf-like message formatting](https://github.com/loveryon/next-log-patcher#output-message-formatting)
- Configure log level visbility threshold through [`LOG_LEVEL`](https://github.com/loveryon/next-log-patcher#log_level) env variable (defaults to `notice`)
- Extra debug output can be controlled via [`LOG_DEBUG`](https://github.com/loveryon/next-log-patcher#log_debug) env variable (fallbacks to `DEBUG` if provided)
- Optionally outputs timestamps by log messages, controlled by [`LOG_TIME`](https://github.com/loveryon/next-log-patcher#log_time) env variable
- Outputs colored logs if terminal supports it (can overriden through `DEBUG_COLORS` env variable)
- Object inspection depth defaults to `4`, but can be overriden via `LOG_INSPECT_DEPTH` (fallbacks to `DEBUG_DEPTH` if provided)
- Writes to `stderr` stream.

### Usage

At beginning of main module of your program invoke:

```javascript
require("next-log-patcher")();
```

### Tests

    $ npm test

