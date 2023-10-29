const expr = require('express');
const app = expr()
const mg = require('mongoose')
const bp = require('body-parser');

mg.connect('mongodb://127.0.0.1:27017/db')
.then(()=>{console.log('you can now add your contact query')})
.catch((err)=>{console.log(err)})

const scheme = new mg.Schema({
    user_name :{type:String},
    email :{type:String},
    subject :{type:String},
    message:{type:String}
})

const person = new mg.model('contact',scheme)

app.use(expr.static(__dirname,{index:'contact.html'}))
const url = bp.urlencoded({extended:false})

app.post('/contact',url,(req,res)=>{
    const {user_name,email,subject,message} = req.body
    console.log(user_name,email,subject,message)
    const createDoc = async()=>{
        try{
            const np = person({user_name,email,subject,message})
            const result = await np.save()
            console.log(result)
            res.send('done')
        }
        catch(err){
            console.log(err)
            res.write(err)
            res.send()
        }
    }
    createDoc()
})

app.listen(3000,()=>{console.log('server started')})