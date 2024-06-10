import Users from "../models/EmployeeModel.js"
import Container from "../models/ContainerModel.js";
import Waste from "../models/WasteModel.js";
import Bin from "../models/BinModel.js";
import transaction from "../models/TransactionModel.js"
import moment from 'moment';
import { updateBinWeightData } from "./Bin.js";
import {io } from "../index.js";


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
                    model: Bin,
                    as: 'bin',
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
        const bin = await Bin.findOne({
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
        const bins = await Bin.findAll({
            where: {
                line: line
            }
        });

        // Jika tidak ada tempat sampah yang ditemukan untuk line yang diberikan
        if (!bins || bins.length === 0) {
            return res.status(404).json({ success: false, message: 'No bins found for the given line' });
        }

        res.status(200).json({ success: true, bins });
    } catch (error) {
        console.error('Error checking bins:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const SaveTransaksi = async (req,res) => {
    const {payload} = req.body;
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

export const UpdateBinWeight = async (req,res) =>{
    const {binId,weight} = req.body;
    const data = await Bin.findOne({where: {rackId:binId}});
    data.weight = parseFloat(weight) + parseFloat(data.weight);
//    console.log([data.weight,neto]);
    await data.save();
     io.emit('weightUpdated', { binId: data.rackId, weight: data.weight });
    
    //await updateBinWeightData(data.name_hostname);
    res.status(200).json({msg:'ok'});
};

export const UpdateBinWeightCollection = async (req, res) => {
    const { binId } = req.body; // neto is not needed as weight will be set to 0
    const data = await Bin.findOne({ where: { rackId: binId } });
    
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
        const { name, status } = req.body;
        console.log([name, status]);
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

export const UpdateStatusContainer = async (req, res) => {
    try {
       const { name, status,line} = req.body;
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


/* export const Hostname = async (res) => {
    const hostname = os.hostname();
    res.status(200).json({ hostname });
} */

