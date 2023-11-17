import CreatedStatus from "./enums/createdStatus.enum";

export interface PatronosEmpleadoresMasterDtos{
    headquartersAddress?:    string,
    localizationPoints?:     string,
    economicActivity?:       string
    commercialName?:         string
    localizationId?:         string,
    createdStatus?:          CreatedStatus
    employeesQty?:           number,
    dateCreated?:            string,
    dateUpdated?:            string,
    mobilePhone?:            string,
    personType?:             string,
    legalName?:              string,
    email?:                  string,
    phone?:                  string,
    rtn?:                    string
    id?:                     string,
    userId?:                 string,
    active?:                 boolean
} 

export default PatronosEmpleadoresMasterDtos;