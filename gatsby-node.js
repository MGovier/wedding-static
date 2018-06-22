const fs = require('fs-extra');
const path = require('path');

exports.onPostBootstrap = () => {
  console.log('Copying locales and icon');
  fs.copySync(
    path.join(__dirname, '/src/locales'),
    path.join(__dirname, '/public/locales')
  );
  fs.copySync(
    path.join(__dirname, '/src/img/android-icon.png'),
    path.join(__dirname, '/public/android-icon.png')
  );
};
