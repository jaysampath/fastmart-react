import { useLocation } from "react-router-dom";
import SubCategoryCard from "./SubCategoryCard";
import SubCategoryNames from "./SubCategoryNames";
import classes from "./Category.module.css";

const Category = (props) => {
  const location = useLocation();
  const params = location.state;

  if (!params) {
    return (
      <p style={{ backgroundColor: "white", textAlign: "center" }}>
        Invalid Access
      </p>
    );
  }

  const categoryName = params.categoryName;

  const getSubCategoryNamesByCategory = (SubCategoryNames, categoryName) => {
    for (let arr in SubCategoryNames) {
      if (SubCategoryNames[arr][categoryName]) {
        return SubCategoryNames[arr][categoryName];
      }
    }
  };

  const subCategories = getSubCategoryNamesByCategory(
    SubCategoryNames,
    categoryName
  );

  // console.log("subCategories: ", subCategories);

  const convertToArray = (subCategories) => {
    let temp = [];
    for (let k in subCategories) {
      temp.push({ name: k, url: subCategories[k] });
    }
    return temp;
  };
  const subCategoryArray = convertToArray(subCategories);
  //console.log(subCategoryArray);

  return (
    <div>
      <h1 className={classes.title}>  Sub-Categories in {categoryName}</h1>
      <div className={classes.subCategories}>
        {subCategoryArray.map((sub) => {
          return (
            <SubCategoryCard
              key={sub.name}
              category={categoryName}
              name={sub.name}
              url={sub.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
