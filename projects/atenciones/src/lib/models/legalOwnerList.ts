import CreatedStatus from "./enums/createdStatus.enum";
import IdentificationType from "./enums/identification-type.enum";

export interface legalOwnerList{
    createdAt?: string,
    createdStatus?: CreatedStatus,
    fullName?: string,
    identificationType?: IdentificationType,
    countryId?: "",
    identificationNumber?: string,
    dataOfBirth?: Date,
    email?: string,
    phoneNumber?: string,
    jobTitle?: string,
    attorneyLicenseNumber?: number,
    startJobDate?: Date,
    endJobDate?: Date,
    id?: 0,
    masterId?: string,
    personRole?: string,
    rtn?: string  
}

export default legalOwnerList;