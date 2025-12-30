import Button from "@/src/shared/ui/components/buttons/Button";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type TasteDowngradeModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function TasteDowngradeModal({
  visible,
  onClose,
  onConfirm,
}: TasteDowngradeModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center px-6"
        onPress={onClose}
      >
        <Pressable
          className="bg-white rounded-3xl p-6"
          onPress={(event) => event.stopPropagation()}
        >
          <Text className="text-2xl font-[InterBold] text-black mb-3">
            Switch to beginner mode?
          </Text>
          <Text className="text-base text-black/70">
            Your advanced taste profile will be overwritten. This action cannot be undone.
          </Text>
          <View className="mt-6" style={{ rowGap: 12 }}>
            <Button text="Keep advanced" variant="ghost" onPress={onClose} />
            <Button text="Yes, switch" onPress={onConfirm} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
