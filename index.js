const Chat = require('./models/chat');

const methodOverride = require('method-override');
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const mongoose = require('mongoose');

main()
    .then((res) => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname,"views"));

//index Route 
app.get("/chats", async (req, res) => { // async because chats returns Promise
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

//New Chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from, 
        msg: msg,
        to: to,
        created_at: new Date(),
    });

    newChat.save()
            .then((res) => console.log("Chat was saved!"))
            .catch((err) => console.log(err));
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params; 
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//Update Route 
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params; 
    let { msg:newMsg } = req.body;
    let UpdatedChat = await Chat.findByIdAndUpdate(
    id, 
    {msg: newMsg},
    { runValidators: true , new: true});

    console.log("Chat was Updated!", UpdatedChat);
    res.redirect("/chats");
});

//Destroy Route 
app.delete("/chats/:id", async ( req, res) => {
    let { id } = req.params;
    let chatToBeDeleted = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
    console.log("Chat was Deleted!", chatToBeDeleted);
});

app.get("/", (req, res) => {
    res.send("Server is working Well!");
});

app.listen(port, () => {
    console.log(`App is listening to ${port}`);
});
