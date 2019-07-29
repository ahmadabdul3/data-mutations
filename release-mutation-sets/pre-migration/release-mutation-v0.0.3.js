// - this is a test file, ignore

const mutationModule = {
  name: 'RELEASE MUTATION V 0.0.1',
  mutate,
};

export default mutationModule;

async function mutate() {
  console.log('=== Running mutation: ' + mutationModule.name + ' ===');
  const mutators = [];

  for (const mutator of mutators) {
    try {
      await mutator.mutate();
    } catch (e) {
      console.log(`ERROR DURING MUTATION -- ${mutator.name}`, e);
    }
  }
}
