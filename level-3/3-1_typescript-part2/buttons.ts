type DialogButtonType = "Yes" | "No";

interface FormButton {
    type: "Add" | "Remove" | "Buy";
}

type AnyButtonType = DialogButtonType | FormButton["type"];
type ConfirmationHandlingFormButton = AnyButtonType & { onConfirm?: (button: DialogButtonType) => void };