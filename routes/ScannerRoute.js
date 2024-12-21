
import express from "express";
import {ScanBadgeid,ScanContainer,CheckBinCapacity,SaveTransaksi,UpdateBinWeight,UpdateBinWeightCollection, SaveTransaksiCollection,VerificationScan,UpdateDataFromStep1,UpdateStatusContainer,getTotalweight, syncEmployeePIDSGAPI, syncDataBinPIDSG} from "../controllers/Employee.js"
import {getbinData} from "../controllers/Bin.js"

const router = express.Router();

router.post('/ScanBadgeid', ScanBadgeid);
router.post('/ScanContainer', ScanContainer);
router.post('/VerificationScan', VerificationScan);
router.post("/SaveTransaksi",SaveTransaksi);
router.post('/SaveTransaksiCollection', SaveTransaksiCollection)
router.post('/UpdateBinWeight',UpdateBinWeight)
router.post('/UpdateBinWeightCollection',UpdateBinWeightCollection)
router.post('/CheckBinCapacity',CheckBinCapacity)
router.post('/UpdateDataFromStep1',UpdateDataFromStep1)
router.post('/UpdateStatusContainer',UpdateStatusContainer)
router.get('/getbinData',getbinData);
router.post('/gettotalweight',getTotalweight);
router.post('/employee-sync',syncEmployeePIDSGAPI);
router.post('/weightbin-sync',syncDataBinPIDSG);
//router.get('/Hostname',Hostname)
export default router;
