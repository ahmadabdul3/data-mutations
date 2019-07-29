
// - cli arg keys, ex: npm run ... file=file-name.ts type=seeder
export const CLI_ARG_KEY__VERSION = 'version';
export const CLI_ARG_KEY__FILE = 'file';
export const CLI_ARG_KEY__TYPE = 'type';
export const CLI_ARG_KEY__HOOK = 'hook';

// - cli arg 'type' values, ex: 'type=seeder'
export const TYPE_VALUE__SEEDER = 'seeder';
export const TYPE_VALUE__SINGLE_MUTATION = 'single-mutation';
export const TYPE_VALUE__TEST_DATA = 'test-data';

// - cli arg 'hook' values, ex: 'hook=post-migration'
export const HOOK_VALUE__PRE_MIGRATION = 'pre-migration';
export const HOOK_VALUE__POST_MIGRATION = 'post-migration';

// - folder names
export const FOLDER_NAME__SEEDERS = 'seeders';
export const FOLDER_NAME__SINGLE_MUTATIONS = 'single-mutations';
export const FOLDER_NAME__TEST_DATA = 'test-data';
export const FOLDER_NAME__PRE_MIGRATION = 'pre-migration';
export const FOLDER_NAME__POST_MIGRATION = 'post-migration';

export const TYPE_TO_FOLDER__MAP = {
  [TYPE_VALUE__SEEDER]: FOLDER_NAME__SEEDERS,
  [TYPE_VALUE__SINGLE_MUTATION]: FOLDER_NAME__SINGLE_MUTATIONS,
  [TYPE_VALUE__TEST_DATA]: FOLDER_NAME__TEST_DATA,
};

export const HOOK_TO_FOLDER__MAP = {
  [HOOK_VALUE__PRE_MIGRATION]: FOLDER_NAME__PRE_MIGRATION,
  [HOOK_VALUE__POST_MIGRATION]: FOLDER_NAME__POST_MIGRATION,
};

// - logging
export const LOGGING__ERROR_TITLE = ':: ERROR ::\n\n';
