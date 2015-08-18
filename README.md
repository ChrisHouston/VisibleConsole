# VisibleConsole
View console.log and error messages on-screen. Perfect for debugging on mobile devices.

## Instructions

1. Include VisibleConsole.js in your HTML: `<script src="VisibleConsole.js"></script>`
2. console.log as normal
3. Messages appear in the on-screen console as well as in your usual browser console.

## Advanced usage

Sometimes you'll want to keep track of rapidly changing values. Instead of clogging up your console, you can send a special name value as the first parameter of your console.log call, and those logs will be placed in their own persistent text boxes.

### stat_

A simple statistic.
```
console.log("stat_Time", "It was", new Date(), "when this was last called");
```

### incr_

Much the same as stat, but automatically keeps track of how many times it has been logged, as well as logging any additional parameters.
```
console.log("incr_Seconds since page load");
```
