const {db} = require('./server/db');
const app = require('./server');
const port = process.env.PORT || 3000;

db.sync({force: true}).then(function(){
  app.listen(port, function () {
    console.log(`Your server, listening on port ${port}`);
  }) // then start listening with our express server once we have synced
})
