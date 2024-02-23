const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/db")
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

//======================================================================================================================

const LoginSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}
);


const LoginSchema1 = mongoose.model('Data1', LoginSchema, 'Logindata');

//======================================================================================================================

const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const SignupSchema1 = mongoose.model('Data2', SignupSchema, 'Signupdata');


//======================================================================================================================

const TaskSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    task:[ {
        type:String,
        required:true
    }]
});

const TaskSchema1 = mongoose.model('Data4', TaskSchema, 'UserTask1');

//======================================================================================================================
module.exports = {
    LoginSchema1,
    SignupSchema1,
    TaskSchema1
};
