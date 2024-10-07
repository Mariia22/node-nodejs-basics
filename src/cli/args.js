const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsObject = {};
  for (let i = 0; i < args.length; i += 2) {
    let key = args[i].slice(2);
    let value = args[i + 1];
    argsObject[key] = value;
  }
  const result = Object.entries(argsObject)
    .map(([key, value]) => `${key} is ${value}`)
    .join(", ");
  console.log(result);
};

parseArgs();
