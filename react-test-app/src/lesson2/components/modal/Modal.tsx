import React, { Fragment } from "react";
import type { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    className,
}) => (
    <Transition show={isOpen} as={Fragment}>
        <Dialog
            as="div"
            open={isOpen}
            onClose={onClose}
            className={styles.modalOverlay}
        >
            <Transition
                show={isOpen}
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={
                        className
                            ? `${styles.modalContent} ${className}`
                            : styles.modalContent
                    }
                >
                    {children}
                </div>
            </Transition>
        </Dialog>
    </Transition>
);
