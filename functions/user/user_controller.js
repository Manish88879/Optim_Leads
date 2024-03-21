const User = require("./user_model");
const bcrypt = require("bcryptjs")

// Register 

const register = async (req , res ) =>{
    try{
        console.log("RUnning 1")
        const {firstName , lastName , phone , email , password} = req.body;

        console.log("Firstname -- " , firstName , " Lastname -- " , lastName , " - Phone - " , phone , " email " , email)
        console.log("RUnning 2" , req.body)
        if(!firstName || !lastName  || !phone || !email)
        return res.json({
             status: 0,
             message: "All fields are mandatory!"
        });
        console.log("RUnning ")


        const findUserByPhone = await User.findOne({phone: phone});
        if (findUserByPhone)
      return res.json({
        status: 0,
        message: "Phone no is already registered!",
      });

      const findUserByEmail = await User.findOne({email: email});

      if(findUserByEmail)
      return res.json({
       status: 0,
       message: "Email is already registered!"})

       let encryptedPassword = await bcrypt.hash(password, 10);

       const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: encryptedPassword
       });

       return res.json({
        status: 1,
        message: "Registration done !",
      });

    }catch(error){
        return res.status(500).json({
            status: 0,
            message: "Something went wrong!"
        })
    }
}

// User Login 

const login = async (req , res ) =>{
  console.log("Login found !")
  try{
    const {emailMob  , password} = req.body;
    if(!emailMob || !password) {
      return res.json({
        status: 0,
        message : "E mail and Password is required!"
      })
    }

    let user;

    user = await User.findOne({phone: emailMob })

    if(!user){
      user = await User.findOne({email : emailMob})
    }

    if(!user){
      return res.status(404).json({
        status: 0,
        message: "User not found"
      })
    }

    const comparedPassword = await bcrypt.compare(password , user.password)

    if(!comparedPassword){
      return res.json({
        status: 0,
        message: "Invalid Password!"
      })
    }

    return res.json({
      status: 1,
      message: "Welcome!"
    })
  }catch (error){
    return res.json({
      status: 0,
      message : "Something went wrong!"
    })
  }
}

module.exports = {
    register,
    login
}