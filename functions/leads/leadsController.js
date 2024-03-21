const User = require("./leadsModel");
const bcrypt = require("bcryptjs")

// create Leads

const create = async (req , res ) =>{
    try{
        console.log("RUnning 1")
        const {ownerName , ownerEmail , ownerPhone , monthlyRevenue , industry , location , SINno , EINno} = req.body;

        console.log("RUnning 2" , req.body)
        if(!ownerName || !ownerEmail  || !ownerPhone || !monthlyRevenue || !industry || !location || !SINno || !EINno)
        return res.json({
             status: 0,
             message: "All fields are mandatory!"
        });
        console.log("RUnning ")


        const findLeadsByPhone = await User.findOne({ownerName: ownerPhone});
        if (findLeadsByPhone)
      return res.json({
        status: 0,
        message: "Lead with this mobile is already added!",
      });

      const findLeadsByEmail = await User.findOne({ownerEmail: ownerEmail});

      if(findLeadsByEmail)
      return res.json({
       status: 0,
       message: "Lead with this email already added!"})

       const user = await User.create({
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        ownerPhone: ownerPhone,
        monthlyRevenue: monthlyRevenue,
        industry: industry,
        location: location,
        SINno: SINno,
        EINno: EINno,
       });

       return res.json({
        status: 1,
        message: "Leads Created",
      });

    }catch(error){
        return res.status(500).json({
            status: 0,
            message: "Something went wrong!"
        })
    }
}

// User Login 

module.exports = {
    create,
}