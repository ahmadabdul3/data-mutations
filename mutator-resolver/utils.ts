
export function extractArgs({ cliArgs }) {
  return cliArgs.reduce((acc, arg, i) => {
    if (i === 0 || i === 1) return acc;
    const [key, value] = arg.split('=');
    acc[key] = value;
    return acc;
  }, {});
}

export function normalizeFileName({ fileName }) {
  const lastThreeChars = fileName.slice(-3);
  if (lastThreeChars !== '.js' && lastThreeChars !== '.ts') return fileName;
  return fileName.slice(0, fileName.length - 3);
}

export function getMetaMessage({ metaData }) {
  const { hook, type } = metaData;
  if (hook) return 'HOOK :: ' + hook;
  else if (type) return 'TYPE :: ' + type;
  else return '';
}
