import React from "react";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { red, blue, green } from "@material-ui/core/colors";

const PhotosSlider = ({ handleOpen, setHandleOpen, photos }) => {
  return (
    <div>
      {/* <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button> */}
      <AutoRotatingCarousel
        //label='Get started'
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={() => setHandleOpen({ open: false })}
        autoplay={false}
        // mobile={isMobile}
        style={{ position: "absolute" }}>
        {photos &&
          photos.map(photo => (
            <Slide
              media={<img src={photo} />}
              mediaBackgroundStyle={{ backgroundColor: red[400] }}
              style={{ backgroundColor: red[600] }}
            />
          ))}
      </AutoRotatingCarousel>
    </div>
  );
};

export default PhotosSlider;
