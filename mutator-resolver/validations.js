import {
  CLI_ARG_KEY__VERSION,
  CLI_ARG_KEY__FILE,
  CLI_ARG_KEY__TYPE,
  CLI_ARG_KEY__HOOK,
  TYPE_VALUE__SEEDER,
  TYPE_VALUE__SINGLE_MUTATION,
  TYPE_VALUE__TEST_DATA,
  HOOK_VALUE__PRE_MIGRATION,
  HOOK_VALUE__POST_MIGRATION,
  LOGGING__ERROR_TITLE,
} from './constants';

const VALID_TYPES__MESSAGE = `Valid types are:\n`
  + ` - type=${TYPE_VALUE__SEEDER}\n`
  + ` - type=${TYPE_VALUE__SINGLE_MUTATION}\n`
  + ` - type=${TYPE_VALUE__TEST_DATA}\n`
  + `Please use one of these values with the 'type' option`;
const VALID_HOOKS__MESSAGE = `Valid hooks are:\n`
  + ` - hook=${HOOK_VALUE__PRE_MIGRATION}\n`
  + ` - hook=${HOOK_VALUE__POST_MIGRATION}\n`
  + `Please use one of these values with the 'hook' option`;

const USE_HELP__MESSAGE = `\n\nTo learn more about using data mutations, run`
  + ` 'npm run data-mutations-help'`;

export default function validateArgs({ args }) {
  ensureArgsExist({ args });
  ensureNoOverlappingArgs({ args });
  if (args[CLI_ARG_KEY__FILE]) ensureValidTypeExists({ args });
  else if (args[CLI_ARG_KEY__VERSION]) ensureHookExists({ args });
}

function ensureArgsExist({ args }) {
  if (!args[CLI_ARG_KEY__VERSION] && !args[CLI_ARG_KEY__FILE]) {
    throw (
      `${LOGGING__ERROR_TITLE}Please provide either a 'file=file-name' or 'version=x.x.x'`
      + ` option when running mutations.`
      + `\n\nIf using the 'file' option don't forget to also provide a 'type' option.`
      + `\nIf using the 'version' option don't forget to also provide a 'hook' option.`
      + `${USE_HELP__MESSAGE}`
    );
  }
}

// - we dont want to allow using both the 'file' and 'version' arguments
//   simultaneously
function ensureNoOverlappingArgs({ args }) {
  if (args[CLI_ARG_KEY__VERSION] && args[CLI_ARG_KEY__FILE]) {
    throw(
      `${LOGGING__ERROR_TITLE}Please use ONLY ONE of 'file=file-name' or 'version=x.x.x'`
      + ` options, not both. ${USE_HELP__MESSAGE}`
    );
  }
}

// - if the 'file' argument is used, we need to make sure
//   a type is provided as well, so that we know if it's a seeder
//   file we're running, or a test-data file, etc..
function ensureValidTypeExists({ args }) {
  const type = args[CLI_ARG_KEY__TYPE];
  if (!type) {
    throw(
      `${LOGGING__ERROR_TITLE}Please provide a 'type=x' option when using the 'file=file-name'`
      + ` mutation option. ${VALID_TYPES__MESSAGE}. ${USE_HELP__MESSAGE}`
    );
  }

  validateTypeValue({ type });
}

function validateTypeValue({ type }) {
  const validTypes = {
    [TYPE_VALUE__SEEDER]: true,
    [TYPE_VALUE__SINGLE_MUTATION]: true,
    [TYPE_VALUE__TEST_DATA]: true,
  };

  if (!validTypes[type]) {
    throw(
      `${LOGGING__ERROR_TITLE}The provided type '${type}', is not valid. ${VALID_TYPES__MESSAGE}`
      + `${USE_HELP__MESSAGE}`
    );
  }
}

function ensureHookExists({ args }) {
  const hook = args[CLI_ARG_KEY__HOOK];
  if (!hook) {
    throw(
      `${LOGGING__ERROR_TITLE}Please provide a 'hook=x' option when using the 'version=x.x.x'`
      + ` mutation option. ${VALID_HOOKS__MESSAGE}. ${USE_HELP__MESSAGE}`
    );
  }

  validateHookValue({ hook });
}

function validateHookValue({ hook }) {
  const validHooks = {
    [HOOK_VALUE__PRE_MIGRATION]: true,
    [HOOK_VALUE__POST_MIGRATION]: true,
  };

  if (!validHooks[hook]) {
    throw(
      `${LOGGING__ERROR_TITLE}The provided hook '${hook}', is not valid. ${VALID_HOOKS__MESSAGE}`
      + `${USE_HELP__MESSAGE}`
    );
  }
}
