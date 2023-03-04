import { useState, useMemo } from "react";
import "./ListItem.css";

export function ListItem({item}) {
    const [imgIndex, setImageIndex] = useState(0);

    const totalFeatures = useMemo(() => item.units.reduce((total, unit) => ({
        bathroom: total.bathroom + unit.bathroom,
        bedroom: total.bedroom + unit.bedroom,
        squareFootage: total.squareFootage + unit.squareFootage,
    }), {bathroom: 0, bedroom: 0, squareFootage: 0}), [item]);

    function prevImage() {
        if (imgIndex <= 0) {
            setImageIndex(item.images.length - 1);
        } else {
            setImageIndex(imgIndex - 1);
        }
    }

    function nextImage() {
        if (imgIndex >= item.images.length - 1) {
            setImageIndex(0);
        } else {
            setImageIndex(imgIndex + 1);
        }
    }
    
    return <div className="ListItem">
        <div className="ListItem-image" style={{backgroundImage: `url(${item.images[imgIndex]})`}}>
            <button onClick={prevImage} className="ListItem-image-btn">&lsaquo;</button>
            <button onClick={nextImage} className="ListItem-image-btn">&rsaquo;</button>
        </div>
        <div className="ListItem-desc">
            <div className="ListItem-price">${item.purchasePrice}</div>
            <div>{totalFeatures.bedroom}bd | {totalFeatures.bathroom}ba | {totalFeatures.squareFootage} ft²</div>
            <div>{item.address.streetNumber} {item.address.route}</div>
            <div>{item.address.locality}, {item.address.stateCode}</div>
        </div>
    </div>
}