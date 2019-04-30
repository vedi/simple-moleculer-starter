# Simple Moleculer Starter

## Intro

Simple reimplementation of moleculer-runner https://moleculer.services/docs/0.12/moleculer-cli.html.

Primary goal: allowing runner to pass control to other modules of the app after moleculer initialisation.

In order to achieve that we implemented another param `--next` in the runner, where you can pass a path to your js-module.
This module will be resolved (via `require`), and it's export function will be called with `moleculerBroker` as a param.

For instance. You can define script `start: node node_modules/simple-moleculer-starter --next app`. And create the following file `app.js`:
```$js
module.export = (broker) => {
  console.log('broker has been initialized');
}
```

## Differences

### Supported params

As it's a simple implementation of the runner, we did not support all possible params of the original cli.
But just supported the following: 
* `--hot` / `-H`,
* `--repl` / `-r`,

### Services

Services to be started should be provided by `SERVICES` env var. However we support plain glob patterns for this, relatively `services` directory of the app.

## License

The project is available under the MIT license.
