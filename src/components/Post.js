import { Link } from "react-router-dom";

export default function Post(props) {
    return (
        <div className="post">
            <h3>{props.post.name}</h3>
            <p>Year: {props.post.year}</p>
            <p>Price: ${props.post.sellingPrice}</p>
            <p>Miles: {props.post.kmDriven}</p>
            <p>Fuel: {props.post.fuel}</p>
            <p>Seller: {props.post.sellerType}</p>
            <p>Transmission: {props.post.transmission}</p>
            <p>Owner: {props.post.owner}</p>
            <p>Mileage: {props.post.mileage}</p>
            <p>Engine: {props.post.engine}</p>
            <p>Max Power: {props.post.maxPower}</p>
            <p>Torque: {props.post.torque}</p>
            <p>Seats: {props.post.seats}</p>
        </div>
    )
}