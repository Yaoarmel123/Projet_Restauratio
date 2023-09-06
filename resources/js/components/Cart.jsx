import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Cart = () => {
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("carts").then((res) => {
            if (res.status === 200) {
                setCarts(Object.values(res.data.carts));
                setTotal(res.data.cart_total);
            }
            setLoading(false);
        });
    }, []);

    const updateCart = (quantity, cartId) => {
        axios
            .put(`cart/${cartId}`, {
                quantity,
            })
            .then((res) => {
                setCarts(Object.values(res.data.carts));
                setTotal(res.data.cart_total);
                swal("Succèss", "Panier mis à jour !", "info");
            });
    };

    const removeFromCart = (cartId) => {
        axios.delete(`cart/${cartId}`).then((res) => {
            setCarts(carts.filter((cart) => cart.id !== cartId));
            setTotal(res.data.cart_total);
            swal("Succèss", "Supprimé du Panier !", "warning");
        });
    };

    let tbody = "";
    if (loading) {
        return <h3>Téléchargement....</h3>;
    } else {
        tbody = (
            <tbody>
                {carts.length === 0 ? (
                    <tr>
                        <td colSpan="5">
                            Cart is Empty{" "}
                            <a href="/shop" className="btn btn-dark">
                                Aller à l'achat
                            </a>
                        </td>
                    </tr>
                ) : (
                    carts.map((cart, index) => {
                        return (
                            <tr key={index}>
                                <td className="shoping__cart__item">
                                    <img
                                        width={100}
                                        height={100}
                                        src={
                                            cart.associatedModel.media[0]
                                                .original_url
                                        }
                                        alt={cart.name}
                                    />
                                    <h5>{cart.name}</h5>
                                </td>
                                <td className="shoping__cart__price">
                                    ${cart.price}
                                </td>
                                <td className="shoping__cart__quantity">
                                    <div className="quantity">
                                        <div
                                            className="pro-qty"
                                            style={{ width: "100px" }}
                                        >
                                            <select
                                                className="form-control"
                                                value={cart.quantity}
                                                onChange={(e) =>
                                                    updateCart(
                                                        e.target.value,
                                                        cart.id
                                                    )
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        cart.associatedModel
                                                            .quantity
                                                    ).keys(),
                                                ].map((x) => (
                                                    <option
                                                        key={x + 1}
                                                        value={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td className="shoping__cart__total">
                                    ${cart.price * cart.quantity}
                                </td>
                                <td className="shoping__cart__item__close">
                                    <span
                                        className="icon_close"
                                        onClick={() => removeFromCart(cart.id)}
                                    ></span>
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        );
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="shoping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="shoping__product">
                                        Produits
                                    </th>
                                    <th>Prix</th>
                                    <th>Quantité</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {tbody}
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="shoping__cart__btns">
                        <a href="#" className="primary-btn cart-btn">
                            CONTINUER SHOPPING
                        </a>
                        <a
                            href="#"
                            className="primary-btn cart-btn cart-btn-right"
                        >
                            <span className="icon_loading"></span>
                            Mettre le panier à jour
                        </a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="shoping__continue">
                        <div className="shoping__discount">
                            <h5>Discount Codes</h5>
                            <form action="#">
                                <input
                                    type="text"
                                    placeholder="Entrer le code de votre coupon"
                                />
                                <button type="submit" className="site-btn">
                                    APPLIQUER UN COUPON
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="shoping__checkout">
                        <h5>Total des articles</h5>
                        <ul>
                            <li>
                                Sous-total <span>{total} FCFA</span>
                            </li>
                            <li>
                                Total <span>{total} FCFA</span>
                            </li>
                        </ul>
                        <a href="/order/checkout" className="primary-btn">
                            PROCEDER AU PAYEMENT
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;

if (document.getElementById("cart")) {
    ReactDOM.render(<Cart />, document.getElementById("cart"));
}
