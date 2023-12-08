

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center my-4  md:w-4/12 ">
            <p className=" text-yellow-500 mb-2 ">---{subHeading}---</p>
            <h2 className="  text-black text-3xl uppercase py-3 border-y-2n ">{heading}</h2>
        </div>
    );
};

export default SectionTitle;