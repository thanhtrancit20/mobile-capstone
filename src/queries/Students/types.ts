export interface CRUStudentPayload {
  password?: string;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  gender?: string;
  gpa?: number;
  enrollmentDate?: string;
  departmentId?: string;
  guardianName?: string;
  guardianPhoneNumber?: string;
  email?: string;
  nationality?: string;
  religion?: string;
  degreeLevel?: string;
  academicYearId?: string;
  present?: Present;
  avatarPath?: string | null;
}
export interface StudentResponse {
  studentId: string;
  username: string;
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  phoneNumber: string;
  gender: string;
  address: string;
  gpa: number;
  enrollmentDate: string;
  major: string;
  guardianName: string;
  guardianPhoneNumber: string;
  email: string;
  avatarPath: string;
  nation: string;
  religion: string;
  citizenId: string;
  faculty: string;
  degreeLevel: string;
  present: Present;
  status: string;
  academicYearId: string;
  fullName: string;
}
export enum Present {
  DROPPED_OUT = 'DROPPED_OUT',
  GRADUATED = 'GRADUATED',
  STUDYING = 'STUDYING',
  SUSPENDED = 'SUSPENDED',
}
export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

export interface StudentProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  address: string;
  email: string;
  phoneNumber: string;
  gender: string;
  avatarPath: any;
  roles: string[];
  studentId: string;
  grade: any;
  enrollmentDate: string;
  major: any;
  guardianName: string;
  guardianPhoneNumber: string;
  nation: any;
  religion: string;
  citizenId: any;
  faculty: any;
  degreeLevel: string;
  schoolYear: any;
  present: string;
  departmentId: string;
}

export interface StudentRegisterCoursePayload {
  studentId: string;
  courseIds: string[];
  semesterId: string;
}

export interface RemovalRegisterCourseForStudentPayload {
  studentId: string;
  courseCodes: string[];
  semesterId: string;
}