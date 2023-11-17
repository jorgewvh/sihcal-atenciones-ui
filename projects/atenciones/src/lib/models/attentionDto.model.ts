import Reason from "./enums/motivo.enum";

export interface AttentionDto{
    active?: boolean,
    applicantId: string,
    attentionType: string,
    applicantType: string,
    assignedStaffId?: string,
    attencionNumber: string,
    createdAt: "",
    details: string,
    disability: string,
    id: string,
    status: string,
    updatedAt: string,
    reason: Reason.DESPIDO,
    tempStatus?: boolean,
    employerId?: string,
    comment?: string,
    localOffice?: string,
    staffId?: string,
    regionalOffice?: string,
    workerFullname: string,
    workerIdentity: string
}
export default AttentionDto;
