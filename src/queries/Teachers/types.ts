export interface CrudTeacherPayload {
  username: string;
  password: string;
  email: string;
  status?: string;
  role?: string;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  departmentId: string;
  salary: number;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  hireDate: string;
  officeHours?: string;
}
