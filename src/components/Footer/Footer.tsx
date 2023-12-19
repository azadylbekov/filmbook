import Container from "@/components/Container";

const Footer = () => {
  return (
    <div className="bg-black border-top !border-[#3c3c3c] text-white h-[100px]">
      <div className="h-full flex items-end justify-center">
        <Container>
          <h4 className="text-center mb-10">
            Designed and built by Azamat Adylbekov
          </h4>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
