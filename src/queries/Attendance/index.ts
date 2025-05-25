import useApis from './api';

export * from './useGetAttendancesBySessionId';
export * from './useCheckAttendanceForTeacher';
export * from './useGetAllClassSessionsByCourseId';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const attendanceApis = useApis();
