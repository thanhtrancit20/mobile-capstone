import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Heading } from '@/components/ui/heading'
import { Checkbox, DataTable } from 'react-native-paper'
import { Button, ButtonText } from '@/components/ui/button'
import { CourseResponse, SemesterResponse } from '@/src/queries/Semester'
import { RemovalRegisterCourseForStudentPayload, StudentProfileResponse } from '@/src/queries/Students/types'
import { useGetRegisteredCourseForStudent } from '@/src/queries/Registration/useGetRegisteredCourseForStudent'
import { useGetUnregisteredCourseForStudent } from '@/src/queries/Registration/useGetUnregisteredCourseForStudent'
import { useRemoveRegistrations } from '@/src/queries/Registration/useRemoveRegistrations'

type Props = {
    student: StudentProfileResponse,
    semester: SemesterResponse,
}

export default function RegisteredCourses({ student, semester }: Props) {
    const { registeredCourses, handleInvalidateRegisteredCourses, setParams, totalElements } = useGetRegisteredCourseForStudent();
    const { handleInvalidateUnregisteredCourses } = useGetUnregisteredCourseForStudent();
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

    const { onRemoveRegistrations } = useRemoveRegistrations({
        onSuccess: () => {
            console.log("success")
            handleInvalidateRegisteredCourses();
            handleInvalidateUnregisteredCourses();
        },
        onError: (error) => {
            console.log(error)
        },
    });

    const handleRemoveRegisteredCourses = () => {
        const payload: RemovalRegisterCourseForStudentPayload = {
            studentId: student.id,
            courseCodes: selectedRows.map((row) => row.code),
            semesterId: semester.id,
        };

        onRemoveRegistrations(payload);
        setSelectedRows([]);
    };

    useEffect(() => {
        setSortedCourses(registeredCourses);
    }, [registeredCourses]);

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
        <View>
            <Heading className="break-words text-lg px-5">
                REGISTERED COURSES
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
                    size="xl" variant="solid" action="negative"
                    className="w-1/3 my-5 self-end mx-2"

                    onPress={handleRemoveRegisteredCourses}
                >
                    <ButtonText>Unregister</ButtonText>
                </Button>
            </DataTable>
        </View >
    )
}