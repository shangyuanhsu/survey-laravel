import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  questionTypes: [],
  toast: {
    message: null,
    show: false,
  },
  setCurrentUser: () => { },
  setUserToken: () => { },
});

// test data
// const tmpSurveys = [
//   {
//     "id": 13,
//     "title": "Activity Satisfaction",
//     "slug": "activity-satisfaction",
//     "image_url": "http://localhost:8000/images/jfCd67bADbzvAWlJ.jpeg",
//     "status": true,
//     "description": "In order for the event to continue to improve, your opinion is very important to us! Thank you for your willingness to open this questionnaire.",
//     "created_at": "2023-05-31 07:12:45",
//     "updated_at": "2023-05-31 07:18:51",
//     "expire_date": "2023-06-10",
//     "questions": [
//         {
//             "id": 10,
//             "type": "radio",
//             "question": "gender",
//             "description": "personal survey",
//             "data": {
//                 "options": [
//                     {
//                         "uuid": "be3566b8-4105-4686-9770-b813da15b4dd",
//                         "text": "Physiological male"
//                     },
//                     {
//                         "uuid": "64891fca-7a92-4172-8bf5-0af2cac41f11",
//                         "text": "Biological female"
//                     },
//                     {
//                         "uuid": "129d66ab-19bd-4f62-b221-35542bf64370",
//                         "text": "multi-gender"
//                     }
//                 ]
//             }
//         },
//         {
//             "id": 11,
//             "type": "select",
//             "question": "age",
//             "description": "personal survey",
//             "data": {
//                 "options": [
//                     {
//                         "uuid": "cdb5c964-a4ab-4bb5-b311-da5feff0580c",
//                         "text": "under 18"
//                     },
//                     {
//                         "uuid": "6378f43b-8e2a-41a8-a553-bf28973fc65c",
//                         "text": "19-25"
//                     },
//                     {
//                         "uuid": "ad58e6e0-17a3-479f-88e9-33c6b288b3bc",
//                         "text": "26-30"
//                     },
//                     {
//                         "uuid": "53c2375c-d456-4784-bb34-d9a970e47f2c",
//                         "text": "31-40"
//                     },
//                     {
//                         "uuid": "6282f50f-42ed-4728-afb6-2d59fcb9845e",
//                         "text": "over 41"
//                     }
//                 ]
//             }
//         },
//         {
//             "id": 12,
//             "type": "radio",
//             "question": "Is there a companion",
//             "description": "personal survey",
//             "data": {
//                 "options": [
//                     {
//                         "uuid": "955668f7-d1a8-437a-aef9-268c19d0c8af",
//                         "text": "yes"
//                     },
//                     {
//                         "uuid": "4eb6e964-ebc4-442e-9432-d116a14e9b7b",
//                         "text": "no"
//                     }
//                 ]
//             }
//         },
//         {
//             "id": 13,
//             "type": "text",
//             "question": "your occupation",
//             "description": "personal survey",
//             "data": []
//         },
//         {
//             "id": 14,
//             "type": "checkbox",
//             "question": "How did you hear about this event in the first place",
//             "description": "activity survey",
//             "data": {
//                 "options": [
//                     {
//                         "uuid": "789d77f3-0c0a-4599-a96e-afe13258b0f1",
//                         "text": "Facebook pop-up event message"
//                     },
//                     {
//                         "uuid": "b3a0d504-540d-4515-8a1a-8f7be58d76ac",
//                         "text": "I usually follow the team news"
//                     },
//                     {
//                         "uuid": "7785a410-94d1-4ba6-9225-7200301f1cc8",
//                         "text": "Recommended by relatives and friends"
//                     },
//                     {
//                         "uuid": "9055d9f2-55f8-4bdf-8515-b94ab6353d2c",
//                         "text": "have attended events in the past"
//                     },
//                     {
//                         "uuid": "084ec7d8-0b6b-45b3-84f2-2e6437d0b9c6",
//                         "text": "other methods"
//                     }
//                 ]
//             }
//         },
//         {
//             "id": 15,
//             "type": "checkbox",
//             "question": "what made you want to attend the event",
//             "description": "activity survey",
//             "data": {
//                 "options": [
//                     {
//                         "uuid": "6fd9a5ab-2eb8-4826-a945-ce0a42e3a5ba",
//                         "text": "Want to get in touch with relevant information"
//                     },
//                     {
//                         "uuid": "aa68f67e-47db-41ef-9962-56060be868c3",
//                         "text": "would like to communicate further with the speaker"
//                     },
//                     {
//                         "uuid": "3b245f04-5d19-4fb3-84af-0baacddc08d9",
//                         "text": "No particular reason, just to see"
//                     },
//                     {
//                         "uuid": "37524881-c178-4122-b68a-eaa97ec4ebf1",
//                         "text": "I've been there before, and I want to see it this time too."
//                     },
//                     {
//                         "uuid": "38dbe573-ad22-4c52-b65b-e2006bd4ff28",
//                         "text": "other reasons"
//                     }
//                 ]
//             }
//         },
//         {
//             "id": 16,
//             "type": "text",
//             "question": "The most impressive activities are",
//             "description": "activity survey",
//             "data": []
//         },
//         {
//             "id": 17,
//             "type": "radio",
//             "question": "How much time did you participate in in total?",
//             "description": "activity survey",
//             "data": {
//                 "options": [
//                     {
//                         "uuid": "559207e5-8611-4635-9b75-1bac56dde663",
//                         "text": "within an hour"
//                     },
//                     {
//                         "uuid": "3a184936-6467-4c5c-ab85-da8b2966b5bd",
//                         "text": "one hour - two hours"
//                     },
//                     {
//                         "uuid": "aac9d918-2c47-4283-9c34-257ecc9acfc4",
//                         "text": "two hours - four hours"
//                     },
//                     {
//                         "uuid": "875fbc7d-3096-4e9a-982f-a3c0e8592629",
//                         "text": "more than four hours"
//                     }
//                 ]
//             }
//         },
//         {
//             "id": 18,
//             "type": "textarea",
//             "question": "If you had to pick one area for improvement, what would it be?",
//             "description": "activity survey / If no, please fill in no",
//             "data": []
//         }
//     ]
// }
// ]
const tmpSurveys = [];

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [surveys, setSurveys] = useState(tmpSurveys)
  const [questionTypes] = useState(['text', "select", "radio", "checkbox", "textarea"])
  const [toast, setToast] = useState({ message: '', show: false })

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token)
    } else {
      localStorage.removeItem('TOKEN')
    }
    _setUserToken(token);
  }

  const showToast = (message) => {
    setToast({ message, show: true })
    setTimeout(() => {
      setToast({ message: '', show: false })
    }, 5000)
  }

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        surveys,
        questionTypes,
        toast,
        showToast
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);