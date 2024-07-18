import { clientList, io } from "../index.js";
import Bin from "../models/BinModel.js";
import Rack from "../models/RackModel.js";


export const getWeightBin =  (socket) => {
    try {
        socket.on('getWeightBin',async (hostname)=>{
            if (!clientList.find(x=>x.hostname==hostname))
                clientList.push({id:socket.id,hostname:hostname});
            await updateBinWeightData(hostname);
        });
    } catch (error) {
        console.error(error);
        socket.emit("getWeight",{ payload: {error:'Terjadi kesalahan server'} });
    }
};

export const updateBinWeightData = async (hostname)=>{
    const _id = clientList.find(x=>x.hostname==hostname);
    if (!_id)
        return;
    const bin = await Rack.findOne({ where: { name_hostname: hostname } });
    let payload = {};
    if (bin) {
        payload = { weight: bin.weight };
    } else {
        payload = { error: 'Bin not found' };
    }
    io.to(_id.id).emit('getweight', payload);
}

export const getbinData = async (req, res) => {
    const { hostname } = req.query;
    try {
        const bin = await Rack.findOne({
            where: { name_hostname: hostname }
        });

        if (bin) {
            res.json({ bin });
        } else {
            res.json({ error: 'bin ID not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
};

export const getTimbanganData = async (req, res) => {
   // const { instruksimsg } = req.body;
    try {
    const instruksimsg = req.body.pesan;
    res.status(200).json({ instruksimsg });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
};