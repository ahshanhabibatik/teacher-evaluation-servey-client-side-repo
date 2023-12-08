import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slider1 from '../../../src/assets/banner 1.jpg'
import slider2 from '../../../src/assets/banner-2 (3).jpg';
import slider3 from '../../../src/assets/banner-3.jpg';
import slider4 from '../../../src/assets/banner-4.jpg';
import { useState } from 'react';



const Banner = () => {
    const [showMoreText, setShowMoreText] = useState(false);

    const handleExploreMore = () => {
        setShowMoreText(!showMoreText);
    };
    return (
        <div className="">
            <Carousel autoPlay interval={5000} infiniteLoop showThumbs={false}>
                <div className='relative'>
                    <img className='md:h-[550px]' src={slider1} alt="Slide 1" />
                    <div className="absolute flex items-center h-full lg:left-0 lg:top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                        <div className='text-white space-y-7 px-3 lg:px-0 lg:pl-12 lg:w-1/2'>
                            <h1 className="lg:text-3xl font-bold">Evaluation Of Teacher Quality Survey</h1>
                            <p className={`text-justify ${showMoreText ? 'block' : 'line-clamp-3'}`}>
                                This survey aims to comprehensively assess and evaluate the quality of teaching through insightful and participant-driven feedback. Your responses play a crucial role in enhancing the overall educational experience. Please share your thoughtful insights and experiences to contribute to the ongoing improvement of teaching quality. Your feedback is valuable and appreciated. Thank you for taking the time to participate in this important evaluation.
                            </p>
                        </div>
                    </div>
                    <div className='absolute  bottom-28 left-12'>
                        <button onClick={handleExploreMore} className="border-2 border-sky-400 px-2 text-white py-2 rounded-lg hover:bg-lime-400">
                            {showMoreText ? 'Show Less' : 'Explore More'}
                        </button>
                    </div>
                </div>
                <div className=' '>
                    <div className='relative'>
                        <img className='md:h-[550px]' src={slider2} alt="Slide 1" />
                        <div className="absolute flex items-center h-full lg:left-0 lg:top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                            <div className='text-white space-y-7 px-3 lg:px-0 lg:pl-12 lg:w-1/2'>
                                <h1 className="lg:text-3xl font-bold">Evaluation Of Teacher Quality Survey</h1>
                                <p className={`text-justify ${showMoreText ? 'block' : 'line-clamp-3'}`}>
                                    This survey aims to comprehensively assess and evaluate the quality of teaching through insightful and participant-driven feedback. Your responses play a crucial role in enhancing the overall educational experience. Please share your thoughtful insights and experiences to contribute to the ongoing improvement of teaching quality. Your feedback is valuable and appreciated. Thank you for taking the time to participate in this important evaluation.
                                </p>
                            </div>
                        </div>
                        <div className='absolute  bottom-28 left-12'>
                            <button onClick={handleExploreMore} className="border-2 border-sky-400 px-2 text-white py-2 rounded-lg hover:bg-lime-400">
                                {showMoreText ? 'Show Less' : 'Explore More'}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='relative'>
                        <img className='md:h-[550px]' src={slider3} alt="Slide 1" />
                        <div className="absolute flex items-center h-full lg:left-0 lg:top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                            <div className='text-white space-y-7 px-3 lg:px-0 lg:pl-12 lg:w-1/2'>
                                <h1 className="lg:text-3xl font-bold">Evaluation Of Teacher Quality Survey</h1>
                                <p className={`text-justify ${showMoreText ? 'block' : 'line-clamp-3'}`}>
                                    This survey aims to comprehensively assess and evaluate the quality of teaching through insightful and participant-driven feedback. Your responses play a crucial role in enhancing the overall educational experience. Please share your thoughtful insights and experiences to contribute to the ongoing improvement of teaching quality. Your feedback is valuable and appreciated. Thank you for taking the time to participate in this important evaluation.
                                </p>
                            </div>
                        </div>
                        <div className='absolute  bottom-28 left-12'>
                            <button onClick={handleExploreMore} className="border-2 border-sky-400 px-2 text-white py-2 rounded-lg hover:bg-lime-400">
                                {showMoreText ? 'Show Less' : 'Explore More'}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='relative'>
                        <img className='md:h-[550px]' src={slider4} alt="Slide 1" />
                        <div className="absolute flex items-center h-full lg:left-0 lg:top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                            <div className='text-white space-y-7 px-3 lg:px-0 lg:pl-12 lg:w-1/2'>
                                <h1 className="lg:text-3xl font-bold">Evaluation Of Teacher Quality Survey</h1>
                                <p className={`text-justify ${showMoreText ? 'block' : 'line-clamp-3'}`}>
                                    This survey aims to comprehensively assess and evaluate the quality of teaching through insightful and participant-driven feedback. Your responses play a crucial role in enhancing the overall educational experience. Please share your thoughtful insights and experiences to contribute to the ongoing improvement of teaching quality. Your feedback is valuable and appreciated. Thank you for taking the time to participate in this important evaluation.
                                </p>
                            </div>
                        </div>
                        <div className='absolute  bottom-28 left-12'>
                            <button onClick={handleExploreMore} className="border-2 border-sky-400 px-2 text-white py-2 rounded-lg hover:bg-lime-400">
                                {showMoreText ? 'Show Less' : 'Explore More'}
                            </button>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>

    );
};

export default Banner;
