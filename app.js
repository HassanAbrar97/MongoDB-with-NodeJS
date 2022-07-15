const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/myfirstmongodb', {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const Employee = mongoose.model('Employee', {
    name: String,
    emp_id: Number,
    email: String,
    date_added: Date,
    dept_id: String,
    tasks:[{name: String, code: String}]
   });

const Department = mongoose.model('Department', {
    dept_id: String,
    name: String,
    descr: String
    
   });

const EmpDesc = mongoose.model('EmpDesc',{
    emp_id: Number,
    name: String,


});

app.post('/AddEmp', async (req, res) => {
    const body = req.body;
    console.log('req.body', body)
      try{
    const employee = new Employee(body);
    
    const result = await employee.save();
    res.send({
      message: 'Data Added Successfully',
      result
    });
    
      }
      catch(ex){
        console.log('ex',ex);
        res.send({message: 'Error'}).status(401);
      }
   });

app.post('/AddDept', async (req, res) => {
    const body = req.body;
    console.log('req.body', body)
      try{
    const department = new Department(body);
    
    const result = await department.save();
    res.send({
      message: 'Data Added Successfully',
      result
    });
    
      }
      catch(ex){
        console.log('ex',ex);
        res.send({message: 'Error'}).status(401);
      }
   });

   app.listen(3100);
   console.log("App running on 3100");