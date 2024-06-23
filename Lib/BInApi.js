import axios from "axios";
const apiClient = axios.create({
    withCredentials: false
});
const rackTarget = "PCS-02.local";
export const setRackDoor = async (id,address,open)=>{
    return await apiClient.post(`http://${rackTarget}/rackOpenManual`,{
        idRack: binData.dataValues.id,
        address: binData.address,
        value: open ? 1 : 0
    });
}