import { UserModalProps } from "@/models/models";
import { Modal } from "flowbite-react";
import UserCard from "../user_card"; 

const UserModal: React.FC<UserModalProps> = ({isOpen, closeModal, cb, user}) => {
    return (
        <Modal show={isOpen} onClose={closeModal} dismissible className="bg-black bg-opacity-30 grid place-content-center" size={"lg"}>
            <Modal.Body>
                <UserCard closeModal={closeModal} cb={cb} user={user}/>
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;