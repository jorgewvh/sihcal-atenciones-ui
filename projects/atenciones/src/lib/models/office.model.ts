export interface Offices {
  childrenOffice: null[];
  office:         Office;
}

export interface Office {
  id:         string;
  office:     string;
  officeType: string;
  parentId:   string;
}
