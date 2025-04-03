"use client";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const CredenzaModal: React.FC<ModalProps> = ({
  children,
  title,
  description,
  isOpen,
  onClose,
  className,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={onChange}>
      <CredenzaContent className={className}>
        <CredenzaHeader>
          <CredenzaTitle>{title}</CredenzaTitle>
          <CredenzaDescription>{description}</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>{children}</CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};

export default CredenzaModal;
