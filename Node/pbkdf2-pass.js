var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var assert = require("assert");
var opts = {
  password: "helloworld"
};
 
// hasher(opts, function(err, pass, salt, hash) {
//   opts.salt = salt;
//   console.log(salt);
// //   console.log(hash);
// hasher(opts, function(err, pass, salt, hash2) {
//     assert.deepEqual(hash2, hash);
//     // console.log(opts);
    
//     // password mismatch
//     opts.password = "aaa";
//     hasher(opts, function(err, pass, salt, hash2) {
//       assert.notDeepEqual(hash2, hash);
//       console.log("OK");
//     });
//   });
// });

hasher(opts, function(err, pass, salt, hash) {
  // console.log(salt);
  opts.salt = salt;
    hasher(opts, function(err, pass, salt2, hash2) {
      // console.log(opts.salt);
      // console.log(salt2);

      try {
        assert.deepEqual(hash, hash2);
      } catch (error) {
        console.log(error.code)
      }
        
        // password mismatch
        // opts.password = "aaa";
        // hasher(opts, function(err, pass, salt, hash2) {
        // assert.notDeepEqual(hash2, hash);
        // console.log("OK");
        // });
    });
});