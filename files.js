let fs = require("fs");

fs.appendFile("e.txt", "More e's", (err) => {
  if (err) throw err;
  console.log("Saved e.txt");
  fs.appendFile("e.txt", "\nMore e's", (err) => {
    if (err) throw err;
    console.log("Updated e.txt");
    fs.open("ee.txt", "w", (err, file) => {
      if (err) throw err;
      console.log("Saved ee.txt");
      fs.writeFile("eee.txt", "Even more e's", (err) => {
        if (err) throw err;
        console.log("Saved eee.txt");
        fs.unlink("ee.txt", (err) => {
          if (err) throw err;
          console.log("Deleted ee.txt");
          fs.writeFile("eee.txt", "A's", (err) => {
            if (err) throw err;
            console.log("Overwrote eee.txt");
            fs.rename("eee.txt", "aaa.txt", (err) => {
              if (err) throw err;
              console.log("eee.txt renamed to aaa.txt");
            });
          });
        });
      });
    });
  });
});
