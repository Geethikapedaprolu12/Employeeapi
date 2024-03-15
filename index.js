const express=require('express');
const employee=require('./employees');
const path=require('path');
const app=express();
const idFilter = req => member => member.id === parseInt(req.params.id);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
const PORT=3001;
app.listen(PORT, () => console.log(`Server is Running ${PORT}`));
app.get('/api/employee',(req,res)=>res.json(employee));
app.get('/api/employee/:id', (req, res) => {
    const found = employee.some(idFilter(req));
    if (found) {
        res.json(employee.filter(idFilter(req)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});
app.post('/api/employee',(req,res)=>{
    const newMember={
    id: users.length + 1,
    name: req.body.name,
    Department: req.body.Department,
    };
    
    if(!newMember.name || !newMember.Department){
        return res.status(400).json({msg:'NAME and Department Must be provided'});
    }
    employee.push(newMember);
    res.json(employee);
    });
app.delete('/api/employee/:id', (req, res) => {
    const found = employee.some(idFilter(req));
    if (found) {
        res.json({msg:'Deleted',members:employee.filter(
        member=>member.id!==parseInt(req.params.id))})
    } else {
         res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
    });
app.put('/api/employee/:id',(req,res)=>
{
    const found = employee.some(member=>member.id===parseInt(req.params.id));
    if(found){
    const updMember=req.body;
        employee.forEach(member=>{      
        if(member.id===parseInt(req.params.id)){
         member.id = updMember ? updMember.id : member.id;
         member.name=updMember ? updMember.name : member.name;
         member.Department =updMember ?  updMember.Department : member.Department;
         res.json({msg:'Updated Details',member})
        }
    });
    }
        else{
            res.status(400).json({msg:'No employee found with ${req.params.id}'});
        }
});