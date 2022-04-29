const {join} = require('path');
const fse = require('fs-extra');
const {exec} = require('child_process');
const htmlmin = require('htmlmin');
const fs = require('fs');

const root = process.cwd();
const dist = join(root, 'home');
const temp = join(root, 'temp');
const assets = join(root, 'static', 'favicon.png');

const deleteDist = () => {
  console.log('> deleteDist');
  if (fse.pathExistsSync(dist)) {
    fse.removeSync(dist);
  }
};

const copyAssets = () => {
  console.log('> copyAssets');
  fse.copySync(assets, join(dist, 'favicon.png'), {});
};

const setupTemp = () => {
  console.log('> setupTemp');
  fse.mkdirsSync(temp);
  fse.mkdirsSync(dist);
  fse.copySync(join(root, 'README.md'), join(temp, 'index.md'), {});
};

const compileMD = (callbacks = []) => {
  console.log('> compileMD');
  exec('index-md', (error, stdout, stderr) => {
    if (error || stderr) {
      console.log('Failed to execute index-md');
    }
    if (error) {
      console.log(error.message);
      return;
    }
    if (stderr) {
      console.log(stderr);
      return;
    }
    console.log(stdout);
    for (const callback of callbacks) {
      callback();
    }
  });
};

const minifyHTML = () => {
  console.log('> minifyHTML');
  const html = join(dist, 'index.html');
  const htmlMin = htmlmin(fs.readFileSync(join(dist, 'index.html'), {encoding: 'utf-8'}))
    .replace(
      '<title></title>',
      '<title>Logoing</title>'
    )
    .replace(
      '<p>Go to https://logoing.savandbros.com for demo.</p>',
      '<div class="loading"><div></div><div></div><div></div><div></div></div>'
    );
  fs.writeFileSync(html, htmlMin);
};

const deleteTemp = () => {
  console.log('> cleanTemp');
  fse.removeSync(temp);
};

const compileSCSS = () => {
  console.log('> compileSCSS');
  exec('sass --no-source-map static/home.scss home/style.css', (error, stdout, stderr) => {
    if (error || stderr) {
      console.log('Failed to execute sass');
    }
    if (error) {
      console.log(error.message);
      return;
    }
    if (stderr) {
      console.log(stderr);
      return;
    }
    console.log(stdout);
  });
};

deleteDist();
deleteTemp();
copyAssets();
setupTemp();
compileMD([minifyHTML, deleteTemp, compileSCSS]);
