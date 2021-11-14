import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
       <hr />
      <div className={classes.actionsDiv}>
       
        <p>  &#169; 2021, FastMart </p>
         <p className={classes.link}>  About Us  </p>
          <p className={classes.link}>Contact Us</p>
          <p className={classes.link}>Return Policy</p>
          <p className={classes.link}>Privacy Policy</p>
      </div>
      
    </footer>
  );
};

export default Footer;
