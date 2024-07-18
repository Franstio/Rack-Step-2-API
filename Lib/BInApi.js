import axios from "axios";
const apiClient = axios.create({
    withCredentials: false
});
const rackTarget = process.env.RACK_BIN;
export const setRackDoor = async (id,address,open)=>{
    try
    {
        return await apiClient.post(`http://${rackTarget ? rackTarget : process.env.RACK_BIN}/rackOpenManual`,{
            idRack: id,
            address: address,
            value: open ? 1 : 0
        });
    }
    catch(err)
    {
        return err;
    }

}