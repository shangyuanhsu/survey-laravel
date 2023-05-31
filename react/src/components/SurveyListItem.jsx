import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import TButton from "./core/TButton";

export default function SurveyListItem({ survey ,handleServeysClick}) {
    return (
        <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]h">
            <img
                src={survey.image_url}
                alt={survey.title}
                className="w-full h-48 object-cover"
            />
            <h4 className="mt-4 text-1g font-bold">
                {survey.title}
            </h4>

            <div dangerouslySetInnerHTML={{ __html: survey.description }}
                className="overflow-hidden flex-1 break-all">
            </div>

            <div className="flex justify-between items-center mt-3">
                <TButton to={`/surveys/${survey.id}`}>
                    <PencilIcon className="W-5 h-5 mr-2 " />
                    Edit
                </TButton>
                <div className="flex items-center">
                    <TButton href={`/survey/public/${survey.slug}`} circle link>
                        <ArrowTopRightOnSquareIcon className="W-5 h-5" />
                    </TButton>
                    {
                        survey.id && (
                            <TButton onClick={()=>{handleServeysClick(survey.id)}} circle link color="red">
                                <TrashIcon className="W-5 h-5" />
                            </TButton>
                        )
                    }
                </div>
            </div >

        </div >
    )
}