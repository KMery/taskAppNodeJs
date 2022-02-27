const app = require('./app');
const port = process.env.PORT;

//Run server
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});