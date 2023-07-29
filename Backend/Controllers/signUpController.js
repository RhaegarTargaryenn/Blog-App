const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');


exports.signUp =async (req, res) => {

try{
       const {name, email, password}= req.body;

       const existingUser = await User.findOne({email});

       if(existingUser){
        return res.status(200).json({       
                    success: false,
                    message: 'user already registered',
        });

    }



        let hashedPassword 
         try{
            hashedPassword = await bcrypt.hash(password, 10)
         }catch(e){
           return res.status(500).json({
              success: false,
              message : 'error in hashing the password',
           })
         }


        const user = await User.create({
            name, email, password:hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
        });
        return res.status(200).json({
            success: true,
            user : user,
            messgae: 'created successfully',
        });



}catch(e){
console.log(e);
return res.status(500).json({
    success: false,
    message: 'error in creating entry in database',
});
}

}



//////////////////////////////////////////////////////////////////////////////////


//login 


exports.login =async (req, res) => {

    try{

        const {email, password} = req.body;
        

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'user is not registered',
            })
        }

          //password match 
           if(await bcrypt.compare(password , user.password)) {
                const token = jwt.sign({
                 user: user._id },
                  JWT_SECRET_KEY, 
                  { expiresIn: '1h'
                  });

            res.status(200).json({
            success: true,
            token: token,
            user : user,
            message : 'Success in login',
            });
            
        }


    }catch (e){


        console.log(`yae hae error ${e.message}`);
        return res.status(500).json({
            success:false,
            messgae : 'login failure',
        });

    }


}





