
const Hero = ({imagesrc}) => {

  const alt = "A movie poster spanning the width of the top of the page"

  return (
    <>
        <div className="herowrapper">
            <img src={imagesrc} className="img-fluid" alt={alt} />
        </div>

    </>
  )
};

export default Hero;
