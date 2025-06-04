import Image from "next/image";

interface ProfileLinkProps {
  url: string;
  imgSrc: string;
  alt: string;
  width: number;
  height?: number;
  title: string;
}

export default function ProfileLink({
  url,
  imgSrc,
  alt,
  width,
  height = width,
  title,
}: ProfileLinkProps) {
  return (
    <div
      className="  flex flex-col items-center"
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className=" hover-target"
      ></Image>
      <p lang="ko" className="hover-target">
        {title}
      </p>
    </div>
  );
}
