const express = require('express');
const comptRoutes = require('./routes/compt');
const app = express();

app.use(express.json());
app.get('/', (req, res)=>{
    res.json({"msg": "just testing"});
});
app.use('/compts', comptRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server running on port"+PORT);
});