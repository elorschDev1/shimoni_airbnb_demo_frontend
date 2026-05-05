const Location=()=>{
    return(
        <>
          <div className="container my-5 p-4 bg-light">
      <h3 className="fw-bold lead fs-3">Find Us With Ease:</h3>
      <p>Located in beautiful Shimoni, Kenyan Coast.</p>

      <div className="map-responsive">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.14638776359!2d39.3775403!3d-4.6466319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18403f09a64b3b7f%3A0x7b5d2c1b2f4e5f4c!2sShimoni%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Shimoni Location"
        ></iframe>
      </div>
    </div>
        </>
    )
}
export default Location;