import Rack from "../models/RackModel.js"
import Waste from "../models/WasteModel.js";
import Admin from "../models/AdminModel.js"
import bcrypt from "bcrypt";

export const getRackList = async (req, res) => {
    try {
        let response;
         response = await Rack.findAll({
                attributes: ['name', 'clientId','weight', 'weightbin','wasteId','address','value'],
                 include: [{
                    model: Waste,
                    attributes: ['name'],
                    as: 'dataWaste'
                }, ], 
            });
     
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const Login = async (req, res) => {
    try {
        console.log(req.body);
      const user = await Admin.findOne({
        where: {
          password: req.body.password,
        },
      });
  
      if (!user) {
        return res.status(404).json({ msg: 'password salah' });
      }
  
//      const match = await bcrypt.compare(req.body.password, user.password);
//        if(!match) return res.status(400).json({msg: "Password Anda Salah!"});
        res.status(200).json({msg: 'Berhasil!!'})
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
}

