import React from 'react';
import { Pressable, Text } from 'react-native';

type PrimaryButtonProps = {
    title: string;
    onIdontKnow: () => void;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    return (
        <Pressable onPress={props.onIdontKnow} className="bg-[#010101] py-5 px-8 rounded-full">
            <Text className="text-white text-2xl" style={{
                fontFamily: "InterRegular"
            }}>{props.title}</Text>
        </Pressable>
    )
}

export default PrimaryButton