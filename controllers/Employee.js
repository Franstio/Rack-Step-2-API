import Users from "../models/EmployeeModel.js"
import Container from "../models/ContainerModel.js";
import Waste from "../models/WasteModel.js";
import Bin from "../models/BinModel.js";
import transaction from "../models/TransactionModel.js"
import moment from 'moment';
import { updateBinWeightData } from "./Bin.js";
import {io } from "../index.js";
import axios from "axios";
import { response } from "express";
import { Op } from "sequelize";
import Rack from "../models/RackModel.js";
import { setRackDoor } from "../Lib/BInApi.js";

const apiClient = axios.create({
    withCredentials: false
});
const rackTarget = "PCS-02.local";
export const ScanBadgeid = async (req, res) => {
    const { badgeId } = req.body;
    try {
        const user = await Users.findOne({ attributes: ['badgeId',"username"], where: { badgeId } });
        if (user) {
            res.json({ user: user });
        } else {
            res.json({ error: 'Badge ID not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Terjadi kesalahan server'  });
    }
};

export const ScanContainer = async (req, res) => {
    const { containerId } = req.body;
    try {
        const container = await Container.findOne({
            attributes: ['containerId','name', 'station', 'weightbin', 'IdWaste','type','status','line'],
            include: [
                {
                    model: Waste,
                    as: 'waste',
                    required: true,
                    duplicating: true,
                    foreignKey: 'IdWaste',
                    attributes: ['name'],
                    include: [
                {
                    model: Rack,
                    as: 'rack',
                    required: true,
                    duplicating:true,
                    foreignKey: 'IdWaste',
                    attributes: ["rackId",'name', 'IdWaste','weight','type','address','value','clientid']
                }
                    ]
                }
            ],
            where: { name: containerId }
        });

        if (container) {
            res.json({ container:container });
        } else {
            res.json({ error: 'Container ID not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
};

export const VerificationScan = async (req, res) => {
    const { binName } = req.body;
    try {
        const bin = await Rack.findOne({
            attributes: ['name'],where: { name: binName }
        });

        if (bin) {
            res.json({ bin:bin });
        } else {
            res.json({ error: 'Container ID not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
};

export const CheckBinCapacity = async (req, res) => {
    const { line } = req.body;
    console.log(req.body);

    try {
        // Mengambil semua tempat sampah yang sesuai dengan line dari database
        const bins = await Rack.findAll({
            where: {
                line: line
            }
        });

        // Jika tidak ada tempat sampah yang ditemukan untuk line yang diberikan
        if (!bins || bins.length === 0) {
            return res.status(404).json({ success: false, message: 'No bins found for the given line' });
        }

        const r = await setRackDoor(bins[0].dataValues.clientId,bins[0].dataValues.address,true);
        res.status(200).json({ success: true, bins });
    } catch (error) {
        console.error('Error checking bins:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const SaveTransaksi = async (req,res) => {
   // const {payload,clientId,address} = req.body;
    const {payload,clientId,address} = req.body;
    console.log([payload,clientId,address]);
    //const response = await apiClient.get(`http://PCS-02.local:5000/sensorrack?clientId=${clientId}&address=${address}`);

/*    const response = await apiClient.get("http://PCS-02.local:5000/sensorrack?clientId="+clientId+"&address="+address);
    console.log([response,response.data]);
    if (response.statusCode ==500)
    {
        res.status(403).json("Rack Id Invalid");
        return;
    }
    if (response.data.sensorrack == 0)
    {
        res.status(401).json("Sensor is 0");
        return;
    }*/
    payload.recordDate = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(payload);
    (await transaction.create(payload)).save();
    res.status(200).json({msg:'ok'});
};

export const SaveTransaksiCollection = async (req,res) => {
    const {payload} = req.body;
    payload.recordDate = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log({collection: payload});
    (await transaction.create(payload)).save();
    res.status(200).json({msg:'ok'});
};
export const SaveTransaksiRack = async (req,res)=>{
    const {name,payload,waste,containerName} = req.body;
    console.log(moment().toDate().toString());
    const lastTransaction = await transaction.findOne({
        where: {
            recordDate: {
            [Op.gte] : moment().toDate()
            }
        },
        include: [{
            model: Waste,
            as:'waste',
            required:true,
            foreignKey: 'IdWaste'
        },{
            model: Container,
            as :'container',
            required:true,
            foreignKey:"idContainer",
            where:{
                [Op.or] : [{
                    name: name
                },
                {
                    name: containerName
                }
            ]
            }
        }]
    });
    const binData = await Rack.findOne({
        where: {
            name: name
        }
    });
    const _waste = await Waste.findOne({
        where:{
            name:waste
        }
    });
    const _container = await Container.findOne({
        where:{
            name: containerName
        }
    });
    if (!binData)
        return res.status(404).json({msg:'Container Rack Not Found'});
    const lastWeight = !lastTransaction ? 0 : parseFloat(lastTransaction.getDataValue('weight'));
    payload.weight = parseFloat(payload.weight) + lastWeight;
    payload.idContainer = _container.dataValues.containerId;
    payload.idWaste = _waste.wasteId;
    binData.setDataValue('weight',payload.weight);
    await binData.save();
    if (payload.handletype)
        delete payload.handletype;
    console.log(payload);
    (await transaction.create({...payload})).save();
    return res.status(200).json({msg:payload});
}

export const UpdateBinWeight = async (req,res) =>{
    const {binId,weight} = req.body;
    const data = await Rack.findOne({where: {rackId:binId}});
    data.weight = parseFloat(weight) + parseFloat(data.weight);
//    console.log([data.weight,neto]);
    await data.save();
     io.emit('weightUpdated', { binId: data.rackId, weight: data.weight });
    
    //await updateBinWeightData(data.name_hostname);
    res.status(200).json({msg:'ok'});
};

export const UpdateBinWeightCollection = async (req, res) => {
    const { binId } = req.body; // neto is not needed as weight will be set to 0
    const data = await Rack.findOne({ where: { rackId: binId } });
    
    if (data) {
        data.weight = 0; // Set weight to 0
        await data.save();
        io.emit('weightUpdated', { binId: data.rackId, weight: data.weight });
        //await updateBinWeightData(data.name_hostname);
        res.status(200).json({ msg: 'ok' });
    } else {
        res.status(404).json({ msg: 'Bin not found' });
    }
};

export const UpdateDataFromStep1 = async (req, res) => {
    try {
        const { name, status ,line} = req.body;
        console.log([name, status,line]);
        if (!name || !status) {
            return res.status(400).json({ msg: "Name dan status harus disertakan" });
        }

        const existingContainer = await Container.findOne({
            where: {
                name: name
            }
        });


        if (!existingContainer) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        await Container.update({ status: status,line: line }, {
            where: {
                name: name
            }
        });

        res.status(200).json({ msg: "Status berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const UpdateStatusContainer = async (req, res) => {
    try {
       const { name, status} = req.body;
        console.log([name, status]);
        if (!name ) {
            return res.status(400).json({ msg: "Name dan status harus disertakan" });
        }

        const existingContainer = await Container.findOne({
            where: {
                name: name
            }
        });
        if (!existingContainer) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        await Container.update({ status: status }, {
            where: {
                name: name
            }
        });

        res.status(200).json({ msg: "Status berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getTotalweight = async (req, res) => {
    try {
        const {name } = req.body;
        
        // Validasi input
        if (!name) {
            return res.status(400).json({ msg: "status harus disertakan" });
        }
        // Query berdasarkan bin_qr, status, dan idContainer
        const transactionRecord = await Rack.findOne({
            where: {
                name: name
            },
            attributes: ['weight']  // specify the attributes to fetch
        });

        if (!transactionRecord) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        res.status(200).json({ msg: "get data berhasil", data: transactionRecord });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


/* export const Hostname = async (res) => {
    const hostname = os.hostname();
    res.status(200).json({ hostname });
} */

