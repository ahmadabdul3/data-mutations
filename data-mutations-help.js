
console.log(`

:: DATA MUTATIONS - USAGE ::

- Data mutations can be run before and/or after running migrations
- The following npm commands exist for running the mutations:

  1. 'npm run data-mutation'
  2. 'npm run data-mutation--no-build'

- The '--no-build' versions don't compile the typescript, this is useful
  in production deployments when the code is already compiled

- There are a few types of mutations that can be run, each with it's own
  command line arguments

  1. Release mutation sets:
    required cli args: version=x.x.x hook=pre-migration OR hook=post-migration
    example: npm run data-mutation version=0.0.3 hook=pre-migration

  2. Single mutation files:
    required cli args: file=file-name type=single-mutation
    example: npm run data-mutation file=file-name type=single-mutation

  3. Seeder mutations:
    required cli args: file=file-name type=seeder
    example: npm run data-mutation file=file-name type=seeder

  4. Test data loaders:
    required cli args: file=file-name type=test-data
    example: npm run data-mutation file=test type=test-data

  : IMPORTANT POINTS :

 - When running any mutations other than the version sets, the hook option
   is NOT necessary

:: DATA MUTATIONS - USAGE ::
`);
