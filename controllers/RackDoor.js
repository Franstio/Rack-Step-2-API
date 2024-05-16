import ModbusRTU from 'modbus-serial';

const client = new ModbusRTU();
client.connectRTU("/dev/ttyUSB0", { baudRate: 9600 });
// set timeout, if slave did not reply back
client.setTimeout(5000);


export const rackOpen = async (req, res) => {
    try {
        if (!client.isOpen) {
            client.open(() => {
                console.log("modbus open");
            });
        }
        const {address} = req.body;
        const {value} = req.body; 
        const {idRack} = req.body;
     console.log({i:idRack,ad:address,val:value});
        client.setID(idRack);
        await client.writeRegister(address, value);
        /* 
        const log = await client.writeRegister(address,value);
        console.log({ log: log, data: data }); */
        /* if (value === 1) {
            res.status(200).json({ msg: `Pintu Rack Dibuka`});
        } else {
            res.status(200).json({ msg: `Kunci dengan address ${address} berhasil ditutup.` });
        } */
        res.status(200).json({ msg: "Pintu Rack Dibuka" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};





