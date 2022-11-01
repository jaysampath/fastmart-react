import classes from "./ItemCard.module.css";
import { Link } from "react-router-dom";


const ItemCard = (props) => {

  const imageResourceUrl = "https://drive.google.com/uc?export=view&id=";
  //console.log(imageResourceUrl+props.item.itemId+".jpg");
  
  return (
    <div className={classes.itemCard}>
      <Link
        className={classes.imageLink}
        to={{
          pathname: "/item-detail",
          state: {
            productId: props.item.productId,
          },
        }}
      >
        <img
          className={classes.image}
          src={imageResourceUrl + props.item.imageUrl}
          alt="item"
        />
      </Link>

      <div className={classes.detail}>
        <h3>{props.item.productName}</h3>
        <p> &#8377; {props.item.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
