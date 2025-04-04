import Container from "@/components/layout/container";
import Page from "@/components/layout/page";
import { LoaderPinwheelIcon } from "lucide-react";
import Link from "next/link";

const EditPage = () => {
  return (
    <Page>
      <Container className="min-h-screen flex items-center justify-center flex-col gap-4">
        <Link href="/">
          <LoaderPinwheelIcon className="text-accent-foreground h-10 w-10" />
        </Link>
        <p className="text-xl text-center">Screenshot Editor, Coming soon!</p>
      </Container>
    </Page>
  );
};

export default EditPage;
