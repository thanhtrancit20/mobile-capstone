import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Heading } from '@/components/ui/heading'
import { formatDate } from '@/src/utils'
import { Checkbox, DataTable } from 'react-native-paper'
import { Button, ButtonText } from '@/components/ui/button'
import { CourseResponse, SemesterResponse } from '@/src/queries/Semester'
import { StudentProfileResponse, StudentRegisterCoursePayload } from '@/src/queries/Students/types'
import { useRegisterCourseForStudent } from '@/src/queries/Registration/useRegisterCourseForStudent'
import { useGetRegisteredCourseForStudent } from '@/src/queries/Registration/useGetRegisteredCourseForStudent'
import { useGetUnregisteredCourseForStudent } from '@/src/queries/Registration/useGetUnregisteredCourseForStudent'

type Props = {
    student: StudentProfileResponse,
    semester: SemesterResponse,
}

export default function UnregisteredCourses({ student, semester }: Props) {
    const { handleInvalidateRegisteredCourses } = useGetRegisteredCourseForStudent();
    const { unregisteredCourses, setParams, handleInvalidateUnregisteredCourses } = useGetUnregisteredCourseForStudent();

    const [sortedColumn, setSortedColumn] = useState<keyof CourseResponse>();
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
    const [sortedCourses, setSortedCourses] = useState<CourseResponse[]>([]);
    const [selectedRows, setSelectedRows] = useState<CourseResponse[]>([]);

    const handleSort = (column: keyof CourseResponse) => {
        const newSortDirection = sortedColumn === column && sortDirection === 'ascending' ? 'descending' : 'ascending';
        setSortDirection(newSortDirection);
        setSortedColumn(column);

        const sortedData = [...sortedCourses].sort((a, b) => {
            if (newSortDirection === 'ascending') {
                return a[column] > b[column] ? 1 : -1;
            } else {
                return a[column] < b[column] ? 1 : -1;
            }
        });

        setSortedCourses(sortedData);
    };

    const toggleSelection = (course: CourseResponse) => {
        setSelectedRows((prev) => {
            const isSelected = prev.some((row) => row.id === course.id);
            if (isSelected) {
                return prev.filter((row) => row.id !== course.id);
            } else {
                return [...prev, course];
            }
        });
    };

    const { onRegisterCourse } = useRegisterCourseForStudent({
        onSuccess: () => {
            console.log("success");
            handleInvalidateRegisteredCourses();
            handleInvalidateUnregisteredCourses();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handleRegisterCourses = () => {
        const payload: StudentRegisterCoursePayload = {
            studentId: student.id,
            courseIds: selectedRows.map((row) => row.id),
            semesterId: semester.id,
        };

        console.log(payload);
        onRegisterCourse(payload);
        setSelectedRows([]);
    };

    useEffect(() => {
        setSortedCourses(unregisteredCourses);
    }, [unregisteredCourses]);

    useEffect(() => {
        if (student?.id && semester?.id && student?.departmentId) {
            setParams({
                studentId: student.id,
                semesterId: semester.id,
                departmentId: student.departmentId,
            });
        }
    }, [student, semester]);

    return (
        <View className='items-center'>
            <Heading className="break-words text-lg">
                OPENING COURSES {semester?.name?.toUpperCase()} SEMESTER
            </Heading>
            <Heading className="break-words text-l">
                {formatDate(semester.registrationStartDate)} - {formatDate(semester.registrationEndDate)}
            </Heading>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 1 }}>Select</DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}
                        sortDirection={sortedColumn === 'name' ? sortDirection : undefined}
                        onPress={() => handleSort('name')}>
                        Course Name
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}
                        sortDirection={sortedColumn === 'code' ? sortDirection : undefined}
                        onPress={() => handleSort('code')}>
                        Code
                    </DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }} numeric>Credits</DataTable.Title>
                </DataTable.Header>

                {sortedCourses?.map((course) => (
                    <TouchableOpacity key={course.id}>
                        <DataTable.Row >
                            <DataTable.Cell style={{ flex: 1 }}>
                                <Checkbox
                                    status={selectedRows.some((row) => row.id === course.id) ? "checked" : "unchecked"}
                                    onPress={() => toggleSelection(course)}
                                />
                            </DataTable.Cell>
                            <DataTable.Cell style={{ flex: 3 }}>{course.name}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 1 }}>{course.code}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 1 }} numeric>{course.credit}</DataTable.Cell>
                        </DataTable.Row>
                    </TouchableOpacity>
                ))}
                <Button
                    size="xl"
                    variant="solid"
                    className="bg-blue-500 w-1/3 my-5 self-end mx-2"
                    onPress={handleRegisterCourses}
                >
                    <ButtonText>Register</ButtonText>
                </Button>
            </DataTable>
        </View>
    )
}