import axios from "axios";
const apiClient = axios.create({
    withCredentials: false
});
const rackTarget = "PCS-02.local:5000";
export const setRackDoor = async (id,address,open)=>{
    return await apiClient.post(`http://${rackTarget}/rackOpenManual`,{
        idRack: id,
        address: address,
        value: open ? 1 : 0
    });
}