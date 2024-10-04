const parseEnv = () => {
  const prefix = "RSS_";

  const result = Object.keys(process.env)
    .filter((key) => key.startsWith(prefix))
    .map((key) => `${key}=${process.env[key]}`)
    .join("; ");

  result
    ? console.log(result)
    : console.log("There is no variables with prefix RSS_");
};

parseEnv();
