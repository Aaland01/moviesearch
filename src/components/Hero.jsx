
const Hero = ({imagesrc}) => {

  const alt = "A movie poster spanning the width of the top of the page"

  return (
    <>
        <div className="herowrapper">
            <img 
              src={imagesrc} 
              className="img-fluid" 
              onError={e => {
                e.target.onError=null;e.target.className="d-none"
              }}
              alt={alt} />
        </div>

    </>
  )
};

export default Hero;
