const Broker = require("./brokersModel");

// Create Brokers

const create = async (req , res ) =>{
    try{
        console.log("RUnning 1")
        const {brokerName , brokerEmail , brokerPhone , companyName ,  location } = req.body;

        console.log("RUnning 2" , req.body)
        if(!brokerName || !brokerEmail  || !brokerPhone || !companyName || !location)
        return res.json({
             status: 0,
             message: "All fields are mandatory!"
        });


        const findBrokerByPhone = await Broker.findOne({brokerPhone: brokerPhone});
        if (findBrokerByPhone)
      return res.json({
        status: 0,
        message: "Broker with this mobile is already exists!",
      });

      const findBrokerByEmail = await Broker.findOne({brokerEmail: brokerEmail});
      console.log("RUnning ")
      if(findBrokerByEmail)
      return res.json({
       status: 0,
       message: "Broker with this email already exists!"})

       const user = await Broker.create({
        brokerName: brokerName,
        brokerEmail: brokerEmail,
        brokerPhone: brokerPhone,
        brokerCompanyName: companyName,
        location: location,
       });

       return res.json({
        status: 1,
        message: "Broker Added",
      });

    }catch(error){
        return res.status(500).json({
            status: 0,
            message: "Something went wrong!"
        })
    }
}

module.exports = {
    create,
}