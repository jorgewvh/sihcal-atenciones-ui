import PatronosEmpleadoresMasterDtos from "./PatronosEmpleadoresMasterDtos";
import legalOwnerList from "./legalOwnerList";

export interface PatronoWrapper {
    patronosEmpleadorMasterDtos: PatronosEmpleadoresMasterDtos,
    legalOwners: legalOwnerList
}
export default PatronoWrapper;