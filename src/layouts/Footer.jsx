const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300">
      <nav>
        <h6 className="footer-title text-primary">Services</h6> 
        <a className="link link-hover">Residential Cleaning</a>
        <a className="link link-hover">Office Cleaning</a>
        <a className="link link-hover">Deep Cleaning</a>
        <a className="link link-hover">Window Washing</a>
      </nav> 
      <nav>
        <h6 className="footer-title text-primary">Company</h6> 
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Reviews</a>
        <a className="link link-hover">Terms of Service</a>
      </nav> 
      <form>
        <h6 className="footer-title text-primary">Newsletter</h6> 
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label> 
          <div className="join">
            <input type="text" placeholder="username@site.com" className="input input-bordered join-item w-full" /> 
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;