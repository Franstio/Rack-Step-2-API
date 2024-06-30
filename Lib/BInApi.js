import axios from "axios";
const apiClient = axios.create({
    withCredentials: false
});
const rackTarget = "PCL-10.local:5000";
export const setRackDoor = async (id,address,open)=>{
    try
    {
        return await apiClient.post(`http://${rackTarget}/rackOpenManual`,{
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