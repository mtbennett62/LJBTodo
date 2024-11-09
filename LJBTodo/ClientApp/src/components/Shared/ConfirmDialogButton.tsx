import { AlertDialog, Button, Flex } from "@radix-ui/themes";


export type DialogButtonProps = {
    child: React.ReactNode;
    title?: string;
    confirmText?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmAction: () => void;
};

const ConfirmDialogButton = ({child, title, confirmText, confirmButtonText, cancelButtonText, confirmAction} : DialogButtonProps) => {


    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                {child}
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>{title ?? 'Confirm action'}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    {confirmText ?? 'Are you sure you want to complete this action?'}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            {cancelButtonText ?? 'Cancel' }
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={confirmAction}>
                            {confirmButtonText ?? 'Confirm'}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default ConfirmDialogButton;