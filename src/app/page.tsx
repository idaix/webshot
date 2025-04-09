import Container from "@/components/layout/container";
import Page from "@/components/layout/page";
import Result from "@/components/result";
import WEBShotForm from "@/components/webshot-form.v3";

const Home = () => {
  return (
    <Page>
      <Container className="min-h-screen grid place-items-center gap-8 py-20">
        <WEBShotForm />
        <Result />
      </Container>
    </Page>
  );
};

export default Home;
