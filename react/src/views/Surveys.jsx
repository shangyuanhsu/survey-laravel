import { useEffect, useState } from "react";
import router from "../router";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import PaginationLinks from "../components/PaginationLinks";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../fetch.js";

export default function Serveys() {
  const { showToast } = useStateContext();
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSurveys();
  }, []);



  const handleServeysClick = (id) => {
    const ans = confirm("Are you sure you want to delete this survey?");
    if (ans) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        getSurveys();
        showToast('The survey was deleted');
      });
    }
  }

  const handleSPageClick = (link) => {
    getSurveys(link.url);
  };


  const getSurveys = (url) => {
    url = url || "/survey";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  return (
    <>
      <PageComponent title="Surveys"
        buttons={(
          <TButton color="green" to="/surveys/create">
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Create new
          </TButton>
        )}
      >

        {loading && <div className="text-center text-lg">Loading...</div>}

        {!loading && (
          <div>
            {surveys.length === 0 && (
              <div className="py-8 text-center">
                You don&apos;t have surveys created
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {surveys.map((element) => (
                <SurveyListItem
                  survey={element}
                  key={element.id}
                  handleServeysClick={handleServeysClick}
                />
              ))}
            </div>
            {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={handleSPageClick} />}
          </div>
        )}
      </PageComponent>
    </>
  )
}
