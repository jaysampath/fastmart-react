import classes from "./SmartPhoneBrands.module.css";
import { Link } from "react-router-dom";
import AppleLogo from "../../resources/apple_logo.png";
import SamsungLogo from "../../resources/samsung_logo.png";
import MiLogo from "../../resources/mi_logo.png";
import OppoLogo from "../../resources/oppo_logo.png";
import OneplusLogo from "../../resources/oneplus_logo.png";
import VivoLogo from "../../resources/vivo_logo.png";
// const topBrandsLogos = {
//   Apple: "1E-qqjbNSt0_c9voz0llJcGkxvWVTJNE2",
//   Samsung: "14Mbs5TRBetjyIo0E-_p_ub9Of6-2JTAW",
//   Vivo: "1vVDEF1tCgokYtL_jCPZ5yNfU0BZj-HSV",
//   Oneplus: "1A_VsaqHrzSXRr3rUzAZcSbQfv-6rHyeR",
//   mi: "1eHw57U6SxGrrhJhlVt1b2s1yfu14UBZ-",
//   Oppo: "1JgqObKATmmph0CLts8VCPtwC1niiREHq",
// };

const SmartPhoneBrands = (props) => {
  //const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

  return (
    <div className={`${classes.container}`}>
     
      {
        <div className={`${classes.logoDiv} ${classes.card} ${classes.shadow}`}>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Mobiles",
                subCategoryName: "Apple",
              },
            }}
          >
            <img
              // src={imageResourceUrl + topBrandsLogos.Apple}
              src={AppleLogo}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Mobiles",
                subCategoryName: "Samsung",
              },
            }}
          >
            <img
              //src={imageResourceUrl + topBrandsLogos.Samsung}
              src={SamsungLogo}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Mobiles",
                subCategoryName: "Vivo",
              },
            }}
          >
            <img
              //src={imageResourceUrl + topBrandsLogos.Vivo}
              src={VivoLogo}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Mobiles",
                subCategoryName: "Oneplus",
              },
            }}
          >
            <img
              //src={imageResourceUrl + topBrandsLogos.Oneplus}
              src={OneplusLogo}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Mobiles",
                subCategoryName: "mi",
              },
            }}
          >
            <img
              //src={imageResourceUrl + topBrandsLogos.mi}
              src={MiLogo}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Mobiles",
                subCategoryName: "Oppo",
              },
            }}
          >
            <img
              //src={imageResourceUrl + topBrandsLogos.Oppo}
              src={OppoLogo}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/category",
              state: {
                categoryName: "Mobiles",
              },
            }}
            className={classes.icon}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="currentColor"
              className="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </Link>
        </div>
      }
    </div>
  );
};

export default SmartPhoneBrands;
