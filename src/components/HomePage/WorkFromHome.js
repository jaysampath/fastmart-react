import classes from "./WorkFromHome.module.css";
import { Link } from "react-router-dom";
const Essentials = {
  Laptops: "1lf1d6qPMkH4q-EeYEd9GrQ3T2wi414JT",
  Moniters: "1adYHmpjUbJhkppYPTG-X2Ur1G5MqVoB3",
  Tables: "1ttT5yXnEj0f57HJa1AVbuWAmxtXmTx8d",
  OfficeChairs: "1FCfMLa8prs9yW-kmSijLQxAeLIWTZS30",
  Routers: "1joOlVsoTk1uspkkoGMWAcB-cVYpj6h-I",
  Keyboards:"1VdoyDid7hrTpSwFIDhAXrsPKG1ffqsVC"
};

const WorkFromHome = (props) => {
  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

  return (
    <div className={`${classes.container}`}>
      {
        <div className={`${classes.logoDiv} ${classes.card} ${classes.shadow}`}>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Electronics",
                subCategoryName: "laptops",
              },
            }}
          >
            <img
              src={imageResourceUrl + Essentials.Laptops}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Electronics",
                subCategoryName: "moniters",
              },
            }}
          >
            <img
              src={imageResourceUrl + Essentials.Moniters}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Home Appliances",
                subCategoryName: "office-chairs",
              },
            }}
          >
            <img
              src={imageResourceUrl + Essentials.OfficeChairs}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Home Appliances",
                subCategoryName: "routers",
              },
            }}
          >
            <img
              src={imageResourceUrl + Essentials.Routers}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Home Appliances",
                subCategoryName: "tables",
              },
            }}
          >
            <img
              src={imageResourceUrl + Essentials.Tables}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/subcategory/items",
              state: {
                categoryName: "Electronics",
                subCategoryName: "others",
              },
            }}
          >
            <img
              src={imageResourceUrl + Essentials.Keyboards}
              alt="logo"
              className={classes.logo}
            />
          </Link>
          <Link
            to={{
              pathname: "/category",
              state: {
                categoryName: "Electronics",
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

export default WorkFromHome;
