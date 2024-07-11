import axios from "axios";
const apiClient = axios.create({
    withCredentials: false
});
const rackTarget = process.env.RACK_BIN;
export const setRackDoor = async (id,address,open)=>{
    try
    {
        console.log({TARGET: [id,address,open,rackTarget]})
        return await apiClient.post(`http://${rackTarget ? rackTarget : process.env.RACK_BIN}/rackOpenManual`,{
            idRack: id,
            address: address,
            value: open ? 1 : 0
        });
    }
    catch(err)
    {
        console.log(err);
        return err;
    }

}