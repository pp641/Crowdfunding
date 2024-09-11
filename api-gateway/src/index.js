
const express =  require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extends: true }));
const apiRoutes = require("./routes/apiGatewayRoutes")(app);
app.use("/api",apiRoutes);
app.listen(port,()=>{
    console.log("Crowdfunding Backend Started ")
})
