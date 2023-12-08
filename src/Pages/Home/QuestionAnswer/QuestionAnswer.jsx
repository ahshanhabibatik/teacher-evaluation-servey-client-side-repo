import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import profile from '../../../assets/faq.png'


const QuestionAnswer = () => {
    return (
        <div>
            <SectionTitle heading="FAQ" subHeading="Question Answer Section"></SectionTitle>
            <div>
                <img className="lg:h-60 lg:w-[600px] flex mx-auto " src={profile} alt="" />
            </div>
            <div className="px-10">
                <div className="collapse border collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" checked="checked" />
                    <div className="collapse-title text-xl font-medium">
                        How are survey responses stored in the database?
                    </div>
                    <div className="collapse-content">
                        <p>Survey responses are typically stored in a database, such as MongoDB or MySQL. Each response is associated with a unique identifier, allowing easy retrieval and analysis.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Can users edit their survey responses?
                    </div>
                    <div className="collapse-content">
                        <p>Generally, once a user submits a survey response, editing is disabled to maintain data integrity. Users are encouraged to review their answers before submission.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How can I prevent users from submitting duplicate responses?
                    </div>
                    <div className="collapse-content">
                        <p>To prevent duplicate responses, the website can use techniques like IP tracking, session management, or requiring users to log in. Additionally, unique identifiers can be associated with each survey response</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow mb-6 bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How are survey charts and analytics generated?

                    </div>
                    <div className="collapse-content">
                        <p>Survey charts and analytics are typically generated using data visualization libraries like Chart.js or D3.js. The website aggregates survey responses and presents insights in the form of charts and graphs for easy interpretation.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionAnswer;