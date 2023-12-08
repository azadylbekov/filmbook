import noMovieImg from '@/assets/noMovieImage.png';

export default function MovieShowCover({ backdrop }) {

  let image = `url(${noMovieImg})`;
  if (backdrop) {
    image = `url(http://image.tmdb.org/t/p/w1280/${backdrop})`;
  }

  return (
    <div
      className="lg:absolute top-0 left-0 right-0 bottom-0 z-[-1] bg-no-repeat bg-cover lg:pb-[45%] pb-[60%] static"
      style={{
        backgroundSize: "top 30% right",
        backgroundImage: image,
      }}
    ></div>
  );
}
