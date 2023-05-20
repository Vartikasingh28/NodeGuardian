const { promisify } = require('util');
const { exec, execSync } = require('child_process');
const execPromise = promisify(exec);

const getPackageVersion = async function(packageName) {
  const { stdout } = await execPromise(`npm view ${packageName} version`);
  // console.log(stdout);
  return stdout.trim();
}

// Usage example
// getLatestVersion('nodemon').then((version) => {
//   console.log(`The latest version of Lodash is ${version}`);
// });

module.exports = getPackageVersion;