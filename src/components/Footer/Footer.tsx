import Container from "@/components/Container";
import TMDBLogo from "@/assets/images/tmdb.svg";

const Footer = () => {
  return (
    <div className="bg-black border-top !border-[#3c3c3c] text-white min-h-[100px] py-8">
      <div className="h-full flex items-center justify-center">
        <Container>
          <h4 className="text-center mb-2">
            Designed and built by Azamat Adylbekov
          </h4>
          <h3 className="text-center mb-2">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB
          </h3>
          <div className="flex justify-center">
            <img className="h-[20px]" src={TMDBLogo} alt="TMDB Logo" />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
