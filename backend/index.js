const express =require ("express")
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path =require("path")
const app =express()


app.use(express.json());
app.use("/images" ,express.static(path.join(__dirname,"/images")) )

mongoose.connect('mongodb://localhost:27017/myapp',
 {useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true,

}).then ( console.log("connected monogDb"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
app.get("/",(res,req)=>{
  req.send("hello")
})

// dotenv.config();


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.listen("5000",()=>{
    console.log("server runnimg");
})