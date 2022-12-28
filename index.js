const app = require('./app');
const connectDB = require('./config/connectDB');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
// listen it from the port
app.listen(PORT, async () => {
    console.log(`server is connected at ${PORT}`);
    await connectDB();
});
