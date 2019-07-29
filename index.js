import resolveMutator from './mutator-resolver';
import { getMetaMessage } from './mutator-resolver/utils';

export default async function mutate({ mutationModule, metaData }) {
  const metaMessage = getMetaMessage({ metaData });
  console.log('');
  console.log('DATA MUTATIONS :: START');
  console.log(metaMessage);
  console.log('');
  try {
    await mutationModule.mutate();
  } catch (e) {
    console.log('MUTATION ERROR: ', e);
  }
  console.log('');
  console.log('DATA MUTATIONS :: END');
  console.log('');
  process.exit();
}

try {
  const result = resolveMutator({ cliArgs: process.argv });
  mutate(result);
} catch (e) {
  console.log('');
  console.log(':: NO MUTATIONS RAN ::');
  console.log('');
}
