import path from 'path';
import validateArgs from './validations';
import { extractArgs, normalizeFileName } from './utils';
import {
  CLI_ARG_KEY__VERSION,
  CLI_ARG_KEY__FILE,
  CLI_ARG_KEY__TYPE,
  CLI_ARG_KEY__HOOK,
  TYPE_TO_FOLDER__MAP,
  HOOK_TO_FOLDER__MAP,
  LOGGING__ERROR_TITLE,
} from './constants';

export default function resolveMutator({ cliArgs }) {
  try {
    const args = extractArgs({ cliArgs });
    validateArgs({ args });

    if (args[CLI_ARG_KEY__VERSION]) return releaseMutationSet({ args });
    else if (args[CLI_ARG_KEY__FILE]) return singleMutationFile({ args });
  } catch (e) {
    console.log(e);
    throw(e);
  }
}

function noOp() {
  return {
    name: 'NO OP MUTATION',
    mutate: () => {
      console.log('');
      console.log('No file or version specified - no mutation to run');
      console.log('');
      console.log('- To select a specific mutation file to execute, run the following:');
      console.log(`  'npm run post-migration-data-mutations file=fileName type=type'`);
      console.log('');
      console.log('- To select a specific release mutation to execute, run the following:');
      console.log(`  'npm run post-migration-data-mutations version=x.x.x'`);
      console.log('');
    }
  };
}

function releaseMutationSet({ args }) {
  const version = args[CLI_ARG_KEY__VERSION];
  const hook = args[CLI_ARG_KEY__HOOK];
  const basePath = `release-mutation-sets`;
  const folderName = HOOK_TO_FOLDER__MAP[hook];
  const mutationFileName = 'release-mutation-v' + version;
  try {
    const fullPath = path.join('..', basePath, folderName, mutationFileName);
    return {
      mutationModule: require(fullPath).default,
      metaData: { hook },
    };
  } catch (e) {
    console.log(`${LOGGING__ERROR_TITLE}CAN'T FIND MUTATION SET FILE FOR VERSION: ${version}`);
    console.log(`Make sure the specified version exists in the mutation sets folder`);
    console.log(`Also, be sure the file is in the right folder (pre vs post migration)`);
    console.log(e);
    throw(e);
  }
}

function singleMutationFile({ args }) {
  const { type } = args;
  const file = normalizeFileName({ fileName: args.file });
  const folder = TYPE_TO_FOLDER__MAP[type];
  try {
    const fullPath = path.join('..', folder, file);
    return {
      mutationModule: require(fullPath).default,
      metaData: { type },
    };
  } catch (e) {
    console.log(`${LOGGING__ERROR_TITLE}CAN'T FIND MUTATION FILE`);
    console.log(`Make sure you spelled the file name correctly`);
    console.log(e);
    throw(e);
  }
}
