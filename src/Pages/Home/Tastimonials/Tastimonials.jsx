import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import avater from '../../../assets/avater.jpg'

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'



const Tastimonials = () => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://teacher-evaluation-server.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])
    return (
        <div className="my-20 bg-slate-200 pb-10">
            <SectionTitle
                subHeading='What our Client say'
                heading='Testimonials'
            >

            </SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide

                        key={review._id}
                    >

                        <div className="flex border-2 border-orange-500 px-5 py-3 rounded-lg flex-col items-center lg:mx-24">

                            <img className="h-20" src={avater} alt="" />
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-8">{review.details}</p>
                            <p className="text-2xl text-orange-400">{review.name}</p>
                        </div>

                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Tastimonials;