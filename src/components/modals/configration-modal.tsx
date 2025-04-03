"use client";

import { useConfigurationModal } from "@/hooks/use-configuration-modal";
import CredenzaModal from "@/components/ui/credenza-modal";
import ConfigurationForm from "@/components/configuration-form";

const ConfigrationModal = () => {
  const useModal = useConfigurationModal();

  return (
    <CredenzaModal
      isOpen={useModal.isOpen}
      onClose={useModal.onClose}
      title="Configuration"
      description=""
    >
      <ConfigurationForm />
    </CredenzaModal>
  );
};

export default ConfigrationModal;
