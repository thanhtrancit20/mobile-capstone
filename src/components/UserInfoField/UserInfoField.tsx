import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

interface UserInfoFieldProps {
    infoField: string;
    infoValue: string;
}

export default function UserInfoField({ infoField, infoValue }: UserInfoFieldProps) {
    return (
        <HStack className="w-full border-b pb-2 mb-2 border-b-gray-300">
            <Text className="w-1/3 break-words text-lg">{infoField}</Text>
            <Heading className="w-2/3 break-words text-lg">{infoValue}</Heading>
        </HStack>
    );
}