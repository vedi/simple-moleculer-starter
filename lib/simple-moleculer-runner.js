'use strict';

// eslint-disable-next-line import/no-unresolved
const { ServiceBroker } = require('moleculer');
const glob = require('glob');
const Args = require('args');

const MOLECULER_CONFIG = 'moleculer.config';

function processFlags() {
  Args
    .option(['H', 'hot'], 'Hot reload services if changed', false)
    .option('next', 'Pass initialisation to this file on completing')
    .option('repl', 'Start REPL mode', false);

  return Args.parse(process.argv, {
    mri: {
      alias: {
        H: 'hot',
        n: 'next',
        r: 'repl',
      },
      boolean: ['repl', 'hot'],
      string: ['next'],
    },
  });
}

const flags = processFlags();
const servicesPatterns = process.env.SERVICES || '{*.js,*/}';

const [moleculerConfigFile] = glob.sync(
  `**/${MOLECULER_CONFIG}.js`,
);

// eslint-disable-next-line import/no-dynamic-require
const moleculerConfig = require(`${process.cwd()}/${moleculerConfigFile}`);

const { servicesPath = 'services' } = moleculerConfig;
const absoluteServicesPath = `${process.cwd()}/${servicesPath}`;

const serviceFiles = glob.sync(
  servicesPatterns,
  {
    cwd: absoluteServicesPath,
  },
);
// eslint-disable-next-line import/no-dynamic-require,global-require
const services = serviceFiles.map((fileName) => require(`${absoluteServicesPath}/${fileName}`));

if (flags.hot) {
  moleculerConfig.hotReload = true;
}

const broker = new ServiceBroker(moleculerConfig);
Object.values(services)
  .forEach((service) => broker.createService(service));

broker.start()
  .then(() => {
    if (flags.repl) {
      broker.repl();
    }
    if (flags.next) {
      broker.logger.info(`Passing control to "${flags.next}"`);
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const next = require(`${process.cwd()}/${flags.next}`);
      return next(broker);
    } else {
      return broker;
    }
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
