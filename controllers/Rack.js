import Rack from "../models/RackModel.js"


export const getRackList = async (req, res) => {
    try {
        let response;
         response = await Rack.findAll({
                attributes: ['rackId','name', 'clientId','weight', 'weightbin','wasteId'],
            });
     
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}