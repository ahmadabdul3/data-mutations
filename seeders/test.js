
const mutationModule = {
  name: 'TEST',
  mutate,
};

export default mutationModule;

async function mutate() {
  console.log('=== Running mutation: ' + mutationModule.name + ' ===');
  await setTimeout(() => console.log('done...'), 500);
}
