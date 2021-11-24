import classes from "./UpgradeHome.module.css";
import { Link } from "react-router-dom";

const smartHomeUrls = {
  smartTv: "1ZZXUH9dSMYejslrVP0Tl1_b2wECZ0Rh9",
  smartBulbs: "1FyyI5qbsgLmp-df72MMrhmWjBSD7IyxK",
  smartSpeaker: "1r2fs5BsrNMf07Kt2dAzmmC56PbrlYJv6",
  smartLock: "1jFTzmwJv-JP0KYSHfFFESYkTjaaxC4zi",
};

const UpgradeHome = (props) => {
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

  return (
    <div className={`${classes.container}`}>
      {
        <div className={`${classes.logoDiv} ${classes.card} ${classes.shadow}`}>
          <Link
            className={classes.logoLink}
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Home Appliances",
                subCategoryName: "TV",
              },
            }}
          >
            <div className={classes.linkDes}>
              <img
                src={imageResourceUrl + smartHomeUrls.smartTv}
                alt="logo"
                className={classes.logo}
              />
              <p>Smart TV</p>
            </div>
          </Link>
          <Link
            className={classes.logoLink}
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Home Appliances",
                subCategoryName: "Samsung",
              },
            }}
          >
            <div className={classes.linkDes}>
              <img
                src={imageResourceUrl + smartHomeUrls.smartSpeaker}
                alt="logo"
                className={classes.logo}
              />
              <p>Smart Speakers</p>
            </div>
          </Link>
          <Link
            className={classes.logoLink}
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Home Appliances",
                subCategoryName: "Vivo",
              },
            }}
          >
            <div className={classes.linkDes}>
              <img
                src={imageResourceUrl + smartHomeUrls.smartBulbs}
                alt="logo"
                className={classes.logo}
              />
              <p>Smart Bulbs</p>
            </div>
          </Link>
          <Link
            className={classes.logoLink}
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Home Appliances",
                subCategoryName: "Oneplus",
              },
            }}
          >
            <div className={classes.linkDes}>
              <img
                src={imageResourceUrl + smartHomeUrls.smartLock}
                alt="logo"
                className={classes.logo}
              />
              <p>Smart Lock</p>
            </div>
          </Link>
        </div>
      }
    </div>
  );
};

export default UpgradeHome;
