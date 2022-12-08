const { loadEnvConfig } = require("@next/env");
const extendEnv = require('../nextConfig/extendEnv');

module.exports = async () => {
  console.info('Jest setupTests script will:');
  console.info("Loading environment variables in Jest from .env files");
  // @see https://github.com/vercel/next.js/issues/17903#issuecomment-708902413
  console.info(process.env.PWD);
  await loadEnvConfig(
    // PWD will not be defined on windows, using cwd() instead
    process.env.PWD || process.cwd());
  // Compute next.config env => it defines the constructed variables, so we need
  // to run it in Jest for the config to work correctly
  const envVariables = extendEnv({}).env;
  Object.entries(envVariables).forEach(([varName, varValue]) => {
    process.env[varName] = varValue;
  });
};
