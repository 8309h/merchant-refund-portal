const express =  require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');



const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
      console.log('Server is running on port 5000');
})