const express =  require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require("./src/routes/authRoutes")
const transactionRoutes =  require("./src/routes/transactionRoutes")
const refundRoutes = require("./src/routes/refundRoutes");




const app = express();
connectDB();
app.use(cors({
      origin:"*"
}));
app.use(express.json());

app.get('/',(req,res) => {
      res.status(200).json({message : "Welcome to Home Page"})
})

app.use("/auth",authRoutes)
app.use("/transactions",transactionRoutes)
app.use("/refunds", refundRoutes);

app.listen(process.env.PORT || 5000, () => {
      console.log('Server is running on port 5000');
})