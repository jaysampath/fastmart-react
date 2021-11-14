import classes from "./SubCategoryCard.module.css";
import { Link } from "react-router-dom";

const SubCategoryCard = props => {

    const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";

    return (
        <div className={classes.subCategoryCard}>
            <div className={classes.imageDiv}>
                <Link className={classes.imageLink}
                to={{
                    pathname:"/subcategory/items",
                    state:{
                        categoryName:props.category,
                        subCategoryName: props.name
                    }
                }}
                >  
                <img className={classes.image} src={imageResourceUrl+props.url} alt="sub category img" />
                 </Link>
            
            </div>

            <div className={classes.detailDiv}>
            <h2>{props.name}</h2>
            </div>
            

            

        </div>
    )
};

export default SubCategoryCard;