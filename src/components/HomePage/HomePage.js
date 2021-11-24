import SmartPhoneBrands from "./SmartPhoneBrands";
import TopRatedSmartphones from "./TopRatedSmartphones";
import WorkFromHome from "./WorkFromHome";
import classes from "./HomePage.module.css";
import LatestOrder from "./LatestOrder";
import UpgradeHome from "./UpgradeHome";
import Banner from "./Banner";


const HomePage = (props) => {
  return (
    <div>
      
        <Banner />
      

      <h2 className={classes.firstTitle}>Smartphones from Popular Brands</h2>
      <SmartPhoneBrands />

      <h2 className={classes.title}>Work from Home Essentials</h2>
      <WorkFromHome />

      <h2 className={classes.title}>Top Rated Smartphones</h2>
      <TopRatedSmartphones />

      <LatestOrder />

      <h2 className={classes.title}>Upgrade Your House </h2>
      <UpgradeHome />
    </div>
  );
};

export default HomePage;
