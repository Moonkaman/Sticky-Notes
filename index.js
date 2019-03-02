const server = require('./api/server');

const port = process.env.PORT || 8000;

server.listen(port, _ => console.log(`\n***Server is running on port ${port}***\n`));