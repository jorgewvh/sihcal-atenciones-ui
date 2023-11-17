import CreatedStatus from "./enums/createdStatus.enum";
 
 export interface attentionFilesDtoList{
    active: boolean,
    attentionId: string,
    createdAt: "",
    fileName: string,
    fileUrl: string,
    id: string,
    status: CreatedStatus.CREATED,
    title: string,
    updatedAt: ""
 }

 export default attentionFilesDtoList;