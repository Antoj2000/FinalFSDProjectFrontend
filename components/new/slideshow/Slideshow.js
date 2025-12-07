
import { useEffect, useState } from "react";
import Image from "next/image";

import parisImg from "../../../assets/images/paris.jpg";
import lakeImg from "../../../assets/images/lake.jpg";
import hillsImg from "../../../assets/images/hills.jpg";
import classes from "./Slideshow.module.css";

const images = [
  { image: parisImg, alt: "Eiffel Tower in Paris" },
  { image: lakeImg, alt: "Serene Lake View" },
  { image: hillsImg, alt: "Rolling Hills Landscape" },
];

export default function Slideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <div
          key={index}
          className={index === currentImageIndex ? classes.active : ""}
        >
          <Image
            src={image.image}
            alt={image.alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
