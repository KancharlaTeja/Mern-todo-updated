
const express = require("express");
const { LoginSchema1, SignupSchema1, TaskSchema1 } = require('./mongo');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//=============================================================================
app.post("/", async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ status: 'unfill' });
  }
  const user = await SignupSchema1.findOne({ email: email })

  if (user)
   {

      if (user.password === password)
      {
          const exist_user = LoginSchema1.findOne({ email: email })
            if (!exist_user)
            {
              await LoginSchema1.create({ email: email, password: password })
              res.json({ status: 'success', email: user.email })
            }
       
            else 
            {
              res.json({ status: 'success', email: user.email })
            }

      }
      else {
        res.json({ status: 'incorrectpassword' })
      }
  }
  else {
    res.json({ status: 'notsignup' })
  }

})

//================================================================================

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.json({ status: 'unfill' });
  }

  const data1 = {
    name: name,
    email: email,
    password: password
  }
  const data2 = {
    email: email,
    task: []
  }
  await TaskSchema1.create(data2)
  const check2 = await SignupSchema1.findOne({ email: email })
  if (check2) {
    return res.json({ status: 'exists' })
  }
  else {
    await SignupSchema1.create(data1)

    res.json({ status: 'success' })
  }
})

//===================================================================


app.post('/get-data', async (req, res) => {
  
  try {
    const user_m = await TaskSchema1.findOne({ email: req.body.email })

    if (!user_m) {
      res.json({ status: 'nodata' })
    } 
    else
     {
      if(user_m.task)
          {
            console.log('Teja we enetered if')
          const userTodos = user_m.task;
          const get_name = await SignupSchema1.findOne({email:req.body.email})
         
          res.json({ status: 'success', todoList: userTodos,todo_user :get_name.name });
          }
      else{
        
        res.json({status:'notasks'})
      }
      }
  }
  catch (e) {
    res.json({ status: e })
  }
});


//===================================================================

app.post("/add-task", async (req, res) => {
  const em3 = req.body.email.trim()
  try {

    const user_n = await TaskSchema1.findOne({ email: em3 });

    if (user_n) {
      await TaskSchema1.updateOne(

        { email: user_n.email },
        { $push: { task: { $each: [req.body.input] } } }

      );
      const user_n1 = await TaskSchema1.findOne({ email: em3 });
      const user_na = await SignupSchema1.findOne({email:em3})
      
      res.json({ status: "success", new_list: user_n1.task ,user_name : user_na.name});

    } else {
      res.json({ status: 'sorry' })
    }
  } catch (error) {
    console.log('hey teja error ...!')
    res.json({ status: "error", error: error.message });
  }
});


//===================================================================

app.post('/delete-task', async (req,res)=>{
  try{
    console.log("entered")
  await TaskSchema1.updateOne(

    { email: req.body.email },
    { $pull: { task: req.body.deleteTask } }

  );

  const delUser = await TaskSchema1.findOne({email : req.body.email})
  console.log(delUser.task)
  res.json({status:'success',afterDel : delUser.task})
  }
  catch(e){
    res.json({status:e})
  }
})
//===================================================================
app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
