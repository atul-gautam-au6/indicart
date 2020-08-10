const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://atul:1234@cluster0.c9ppv.mongodb.net/shopingapp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log(err.message));