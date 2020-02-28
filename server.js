const express=require("express");
const app=express();
const path=require("path");

app.use(express.static(__dirname + "/dist/ToDo"));
app.listen(process.env.PORT || 8080);

app.get("*",function(req,res){
  res.sendFile(path.join(__dirname + "/dist/ToDo/index.html"));
})

console.log("console listening");
