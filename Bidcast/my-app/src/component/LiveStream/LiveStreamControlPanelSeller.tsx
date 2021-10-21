import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-tiny-slider";
import { TinySliderInstance } from "tiny-slider";
import { fetchSelectedProduct } from "../../redux/LiveStream/actions";
import { RootState } from "../../store";
import { Socket } from "socket.io-client";
import LiveStreamDescription from "./LiveStreamDescription";

interface LiveStreamControlPanelProps {
    isDesktop: boolean;
    isTablet: boolean;
    ws: Socket | null;
}

function LiveStreamControlPanel(props: LiveStreamControlPanelProps) {
    const carousel = useRef<TinySliderInstance>(null);

    const goNextSlide = (dir: "next" | "prev") =>
        carousel.current != null && carousel.current.goTo(dir);

    const liveStreamControlPanelDesktopSetting = { maxHeight: "600px" };

    const dispatch = useDispatch();

    const products = useSelector(
        (state: RootState) =>
            state.liveStream.liveStreamProducts.liveStreamProductsArr
    );

    const liveId = useSelector(
        (state: RootState) => state.liveStream.liveStreamInfo.id
    );

    const carouselOnClickHandler = (
        slideIndex: number | null,
        info: any,
        event: React.MouseEvent<Element, MouseEvent>
    ) => {
        if (slideIndex == null) {
            return;
        }
        let ind = parseInt(
            info.slideItems.item(slideIndex).ariaLabel.split("card").join("")
        );
        let productId = -1;
        for (let i = 0; i < products.length; i++) {
            if (ind === products[i].id) {
                productId = products[i].id;
            }
        }
        if (props.ws) {
            dispatch(fetchSelectedProduct(productId, props.ws, liveId));
        }
    };

    return (
        <div className="LiveStreamControlPanel rounded my-4">
            <div
                className="row g-0 panel_bar"
                style={
                    props.isDesktop ? {} : liveStreamControlPanelDesktopSetting
                }
            >
                <div
                    className={`col-12 d-flex d-col carousel position-relative`}
                >
                    <Carousel
                        swipeAngle={false}
                        items={1}
                        ref={carousel}
                        controls={false}
                        nav={false}
                        onClick={carouselOnClickHandler}
                    >
                        {products.length !== 0 ? (
                            products.map((product, ind) => (
                                <div
                                    key={product.id}
                                    className={`carousel_card d-flex align-items-center justify-content-between`}
                                    aria-label={`card${product.id}`}
                                >
                                    <img
                                        key={product.id}
                                        className={`carousel_img ms-3`}
                                        src={product.productImage}
                                        alt={`pic${product.id}`}
                                    />
                                    <div className="product_info mh-100 d-flex flex-column justify-content-center align-items-start">
                                        <div className="product_name">
                                            <i className="fas fa-gift"></i>{" "}
                                            競價項目:
                                            <br />
                                            {product.productName}
                                        </div>
                                        <div className="product_price">
                                            <i className="fas fa-chart-line"></i>{" "}
                                            起標價:
                                            <br />${product.minPrice}
                                        </div>
                                    </div>
                                    <LiveStreamDescription
                                        description={
                                            product.description
                                                ? product.description
                                                : ""
                                        }
                                    />
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </Carousel>

                    <button
                        className="btn btn-secondary carousel_btn carousel_btn_left"
                        onClick={() => goNextSlide("prev")}
                    >
                        <i className="fas fa-caret-left"></i>
                    </button>
                    <button
                        className="btn btn-secondary carousel_btn carousel_btn_right"
                        onClick={() => goNextSlide("next")}
                    >
                        <i className="fas fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LiveStreamControlPanel;
