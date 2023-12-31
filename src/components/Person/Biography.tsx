import { FC } from "react";

interface BiographyProps {
  biography?: string | undefined;
  showMore: boolean;
  setShowMore: (isShowMore: boolean) => void;
}

const Biography: FC<BiographyProps> = ({
  biography,
  showMore,
  setShowMore,
}) => {
  const paragraphSplitter = (text: string) => {
    if (showMore) {
      return text.split(/\r?\n/);
    }
    return text.substring(0, 200).split(/\r?\n/);
  };

  return (
    <>
      {biography && (
        <div className="md:text-lg text-md mt-4">
          {paragraphSplitter(biography).map((para, index) => (
            <p key={index} className="mb-2">
              {para}
            </p>
          ))}
          {biography.length > 200 && (
            <span
              onClick={() => {
                setShowMore(!showMore);
              }}
              className="cursor-pointer text-blue-400"
            >
              {showMore ? "Show less" : "Show more"}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Biography;
