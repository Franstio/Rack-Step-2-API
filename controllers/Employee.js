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
import Rack from "../models/RackModel.js";
import { setRackDoor } from "../Lib/BInApi.js";
import db from "../config/db.js";
import { Op, QueryTypes } from "sequelize";

const apiClient = axios.create({
    withCredentials: false
});
const rackTarget = "PCL-10.local";
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
};

export const CheckBinCapacity = async (req, res) => {
    const { line,weight } = req.body;

    try {
        // Mengambil semua tempat sampah yang sesuai dengan line dari database
        const bins = await db.query(`Select rackId,name,clientId,weight,weightbin,wasteId,address,value from rack where line=? and (weight+${weight}) < max_weight`,{type:QueryTypes.SELECT,
        replacements: [line]});
        // Jika tidak ada tempat sampah yang ditemukan untuk line yang diberikan
        if (!bins || bins.length === 0) {
            return res.status(404).json({ success: false,bins:[], message: 'No bins found available' });
        }
        console.log(bins);
        const r = await setRackDoor(bins[0].clientId,bins[0].address,true);
        res.status(200).json({ success: true, bins });
    } catch (error) {
        console.log('Error checking bins:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const SaveTransaksi = async (req,res) => {
   // const {payload,clientId,address} = req.body;
    const {payload,clientId,address} = req.body;
    //const response = await apiClient.get(`http://PCL-10.local:5000/sensorrack?clientId=${clientId}&address=${address}`);

/*    const response = await apiClient.get("http://PCL-10.local:5000/sensorrack?clientId="+clientId+"&address="+address);
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
    (await transaction.create(payload)).save();
    res.status(200).json({msg:'ok'});
};

export const SaveTransaksiCollection = async (req,res) => {
    const {payload} = req.body;
    payload.recordDate = moment().format("YYYY-MM-DD HH:mm:ss");
    (await transaction.create(payload)).save();
    res.status(200).json({msg:'ok'});
};
export const SaveTransaksiRack = async (req,res)=>{
    const {name,payload,waste,containerName} = req.body;
    /*const lastTransaction = await transaction.findOne({
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
    });*/
    const binData = await Rack.findOne({
        where: {
            [Op.or] : [{
                name: name
            },
            {
                name: containerName
            }
        ]
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
    const lastWeight = !binData.dataValues.weight ? 0 : parseFloat(binData.dataValues.weight);
    payload.weight = (payload.type=='Collection') ? 0 :  parseFloat(payload.weight) + lastWeight;
    payload.idContainer = _container.dataValues.containerId;
    payload.idWaste = _waste.wasteId;
    payload.station = _container.dataValues.station;
    if (binData)
    {
        binData.setDataValue('weight',payload.weight);
        await binData.save();
        io.emit('weightUpdated', { binId: binData.dataValues.rackId, weight: binData.dataValues.weight });
    }
    else
        await binData.save();
    if (payload.handletype)
        delete payload.handletype;
    if (payload.type=='Collection')
        await setRackDoor(binData.dataValues.clientId,binData.dataValues.address,true);
    (await transaction.create({...payload})).save();
    return res.status(200).json({msg:payload});
}

export const UpdateBinWeight = async (req,res) =>{
    const {binId,weight} = req.body;
    const data = await Rack.findOne({where: {rackId:binId}});
    data.weight = parseFloat(weight) + parseFloat(data.weight);
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

export const syncEmployeePIDSGAPI = async (req,res)=>{
    try
    {
        const {syncEmp} = req.body;
        const apiEmpBadgeNo= [];
        for (let i=0;i<syncEmp.length;i++)
        {
            const empRes = await db.query("Select badgeId,username,active from employee where badgeId=?",{type:QueryTypes.SELECT,replacements:[syncEmp[i].badgeno]});
            apiEmpBadgeNo.push(`'${syncEmp[i].badgeno}'`);
            if (empRes.length < 1)
            {
                await db.query("Insert Into employee(username,badgeId,active) values(?,?,1)",
                {
                    type:QueryTypes.INSERT,
                    replacements: [syncEmp[i].employeename,syncEmp[i].badgeno]
                });
            }
            else
            {
                await db.query("Update employee set username=?,active=1 where badgeId=?",{
                    type: QueryTypes.UPDATE,
                    replacements: [syncEmp[i].employeename,syncEmp[i].badgeno]
                })
            }
        }

        await db.query("Update employee set active=0 where badgeId not in (" + apiEmpBadgeNo.join(",") + ")",{
          type: QueryTypes.UPDATE
        });
        return res.status(200).json({msg:"Sync Success"});
    }
    catch (er)
    {
        console.log(er);
        return  res.status(500).json({msg:er.message || er});
    }
}
export const syncDataBinPIDSG = async (req,res)=>{
    try
    {    
        const {syncBin} = req.body;
        for (let i=0;i<syncBin.length;i++)
        {
            await db.query("update rack set max_weight=?,weightbin=? where name=? ",{
                    type: QueryTypes.UPDATE,
                    replacements: [syncBin[i].capacity,syncBin[i].weight,syncBin[i].name]
                });  
            await db.query("update   container set weightbin=? where name=? ",{
                type: QueryTypes.UPDATE,
                replacements: [syncBin[i].weight,syncBin[i].name]
            })
        }
        return res.status(200).json({msg:"Sync Success"});
    }
    catch (er)
    {

        console.log(er);
        return  res.status(500).json({msg:er.message || er});
    }
}
