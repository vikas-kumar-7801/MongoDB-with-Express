// This file to initialize sample data to test
const mongoose = require('mongoose');
const Chat = require('./models/chat');


main()
    .then((res) => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [{
    from: "Vikas",
    to: "Anushka",
    msg:"Hello",
    created_at: new Date()// By Default create date randomly format( UTC )
    },{
        from: "Vikas",
        to: "Anushka",
        msg:"Hello",
        created_at: new Date()
    },{
        from: "Vikas",
        to: "Ayush",
        msg:"Hi",
        created_at: new Date()
    },{
        from: "Ayush",
        to: "Anushka",
        msg:"Namaste",
        created_at: new Date()
    },{
        from: "Anushka",
        to: "Vikas",
        msg:"Namaste",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);