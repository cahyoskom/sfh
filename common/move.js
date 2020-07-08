const fs = require('fs');

module.exports = async (oldpath, newpath) => {
  fs.readFile(oldpath, function (err, data) {
    if (err) throw err;
    // console.log('File read!');

    // Write the file
    fs.writeFile(newpath, data, function (err) {
      if (err) throw err;
      // console.log('File written!');
    });

    // Delete the file
    fs.unlink(oldpath, function (err) {
      if (err) throw err;
      // console.log('File deleted!');
    });
  });
};
