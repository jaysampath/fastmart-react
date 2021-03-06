import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <hr />
      <div className={classes.actionsDiv}>
        <p> &#169; 2021, FastMart </p>
        <p>
          <a
            href="https://jaysampath.github.io/"
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            About Us
          </a>
        </p>
        <p>
          <a
            href="mailto:jaysampath.fastmart@gmail.com"
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            Contact Us
          </a>
        </p>
        <p>Return Policy</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
