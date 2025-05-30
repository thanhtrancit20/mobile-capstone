export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  address: string;
  dateOfBirth: Date;
  status: UserStatus;
  avatar: string;
  roles?: Role;
  teacherId?: string;
  studentId?: string;
  present: string;
  degreeLevel: string;
  departmentId: string
  fullname: string;
  faceVerified: boolean;
};
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
}

export enum ONLINE_STATUS {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}