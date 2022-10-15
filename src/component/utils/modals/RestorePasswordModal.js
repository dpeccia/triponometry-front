import { Divider, Modal, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { useState } from "react";
import { EmailSendStep } from "../../login/restore_password/EmailSendStep";
import { CodeEntryStep } from "../../login/restore_password/CodeEntryStep";
import { RestorePasswordStep } from "../../login/restore_password/RestorePasswordStep";

export const RestorePasswordModal = (props) => {
    const [step, setStep] = useState('FIRST_STEP')
    const changeStep = (newStep) => setStep(newStep)
    const emptyRestoreInfo = { 'email': '', 'verificationCode': '' }
    const [restoreInfo, setRestoreInfo] = useState(emptyRestoreInfo)

    const onCancel = () => {
        props.onClose()
        setStep('FIRST_STEP')
        setRestoreInfo(emptyRestoreInfo)
    }

    const StepsComponents = {
        FIRST_STEP: <EmailSendStep next={changeStep} restoreInfo={restoreInfo} setRestoreInfo={setRestoreInfo} closeModal={onCancel} />,
        SECOND_STEP: <CodeEntryStep next={changeStep} restoreInfo={restoreInfo} setRestoreInfo={setRestoreInfo} closeModal={onCancel} />,
        THIRD_STEP: <RestorePasswordStep restoreInfo={restoreInfo} closeModal={onCancel} />
    }

    const stepSpecificComponent = StepsComponents[step]

    return (
        <>
            <Modal size='lg' isCentered isOpen={props.isOpen} onClose={onCancel}>
                {props.overlay}
                <ModalContent>
                    <ModalHeader>¿Olvidaste tu contraseña?</ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    {stepSpecificComponent}
                </ModalContent>
            </Modal>
        </>
    );
}