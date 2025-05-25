import { BaseCourseResponse } from '../Courses/types';
import { TableParams } from '../helpers';
import { CourseResponse } from '../Semester';

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
export enum RegisterStatus {
  PENDING = 'PENDING',
  CANCEL = 'CANCEL',
  APPROVED = 'APPROVED',
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

export interface RegisterCoursePayload {
  studentId: string;
  courseIds: string[];
  semesterId: string;
}

export interface RegistrationResponse {
  id: string;
  studentId: string;
  courseCode: string;
  courseName: string;
  status: RegisterStatus;
  semesterName: string;
  semesterId: string;
  registrationDate: Date;
  cancellationDeadline: Date;
  courseDetails: CourseResponse;
  baseCourseDetails?: BaseCourseResponse;
  thumbnail: string;
}

export type GetCoursePropertiesParams = {
  studentId?: string;
  semesterId?: string;
  departmentId?: string;
  [key: string]: number | number[] | string | string[] | boolean | undefined | any[] | any;
};

export interface AssignTeacherPayload {
  teacherId: string;
  courseIds: string[];
  semesterId: string;
}

export interface RemovalTeacherFromCoursePayload {
  teacherId: string;
  courseIds: string[];
  semesterId: string;
}