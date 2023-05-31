import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../fetch";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyPublicView() {
    const answers = {};
    const [surveyFinished, setSurveyFinished] = useState(false);
    const [survey, setSurvey] = useState({
        questions: [],
    });
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    const initialized = useRef(false);

    const init = () => {
        setLoading(true);
        axiosClient
            .get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setLoading(false);
                setSurvey(data.data);
            })
            .catch(() => {
                setLoading(false);
                alert("No active!")
                window.close();
                return
            });
    }

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            init();
        }

    }, []);

    function answerChanged(question, value) {
        answers[question.id] = value;
        console.log(question, value);
    }

    function onSubmit(ev) {
        ev.preventDefault();

        console.log(answers);
        axiosClient
            .post(`/survey/${survey.id}/answer`, {
                answers,
            })
            .then(() => {
                // debugger;
                setSurveyFinished(true);
            }).catch(error => {
                console.log(error.message);
            });
    }

    return (
        <div>
            <div className="bg-yellow-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-3xl text-white	font-bold">OKGO</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {loading && <div className="flex justify-center">Loading..</div>}
            {!loading && (
                <form onSubmit={(ev) => onSubmit(ev)} className="container mx-auto p-4">
                    <div className="block  md:block lg:flex">
                        <div className="mr-0 w-auto md:w-auto lg:w-max lg:mr-4 mb-3">
                            <img src={survey.image_url} alt="" />
                        </div>

                        <div>
                            <h1 className="text-3xl mt-3">{survey.title}</h1>
                            <p className="text-sm my-3">
                                Expire Date: {survey.expire_date}
                            </p>
                            <p className="text-sm mb-5">{survey.description}</p>
                        </div>
                    </div>

                    {surveyFinished && (
                        <div className="py-6 px-6 bg-emerald-700 text-white  mx-auto">
                            Thank you for participating in the survey
                        </div>
                    )}
                    {!surveyFinished && (
                        <>
                            <div>
                                {survey.questions.map((question, index) => (
                                    <PublicQuestionView
                                        key={question.id}
                                        question={question}
                                        index={index}
                                        answerChanged={(val) => answerChanged(question, val)}
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-900 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Submit
                            </button>
                        </>
                    )}
                </form>
            )}
        </div>
    );
}
