require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const smtpRouter = require('./routes/smtpRouter')


const path = require('path')


const app = express()
app.use(cors())
app.use(express.json())


// Routes

app.use('/api/smtp',smtpRouter)


// Connect to MongoDB
const URI = "mongodb+srv://arjun123:arjun123@social-network-me8jg.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})


// Below MongoDB and  Above Listen Sever
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}




// Listen Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})