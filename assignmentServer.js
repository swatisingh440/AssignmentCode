let express=require('express');
let app=express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next();
});
var port=process.env.PORT||2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
  

let {data}=require("./assignmentData.js");

app.get("/schedules",function(req,res){
    res.send(data)
})
app.get("/schedules/:title",function(req,res){
    let title=req.params.title;
    const arr1=data.filter((st)=>st.title===title)
    res.send(arr1)
})
app.delete("/schedules/:id",function(req,res){
    let id=+req.params.id;
    let index=data.findIndex((st)=>st.id===id);
    if(index>=0){
    let deletedData=data.splice(index,1);
    console.log(deletedData)
    res.send(deletedData)}
    else
    res.status(404).send("No data found")
})
app.put("/schedules/:id",function(req,res){
    let id=+req.params.id;
    let body=req.body;
    let index=data.findIndex((st)=>st.id===id);
    if(index>=0){
    let updatedData={...body}
    console.log(title,body)
    data[index]=updatedData
    res.send(updatedData)}
    else
    res.status(404).send("No data found")
})
app.post("/schedules",function(req,res){
    let body=req.body;
    console.log(body)
    let maxid=data.reduce((acc,curr)=>curr.id>=acc?curr.id:acc,0);
    let newid=maxid+1
    
    let newData={id:newid,...body};
    data.push(newData);
    res.send(newData)

})

