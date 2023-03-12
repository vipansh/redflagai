import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { Modal } from "../../../components";

interface Question {
  id: string;
  question: string;
  type: "text" | "textarea" | "radio" | "checkbox";
  placeholder?: string;
  options?: { id: string; value: string; label: string }[];
  dummyAnswer: string | string[];
  required?: boolean;
}

const questionList: Question[] = [
  {
    id: "businessName",
    question: "What is the name of your business?",
    type: "text",
    placeholder: "Enter your business name",
    dummyAnswer: "XYZ Corp.",
    required: true,
  },
  {
    id: "businessNature",
    question:
      "What is the nature of your business? What products or services do you offer?",
    type: "radio",
    options: [
      {
        id: "digitalMarketing",
        value: "Digital marketing services",
        label: "Digital marketing services",
      },
      {
        id: "webDesign",
        value: "Web design and development services",
        label: "Web design and development services",
      },
    ],
    dummyAnswer: "We offer digital marketing services.",
    required: true,
  },
  {
    id: "geographicScope",
    question:
      "What is the geographic scope of your business? Do you operate in a specific country or region, or are you a global company?",
    placeholder: "Enter your geographic scope",
    dummyAnswer: "Global",
    type: "radio",
    options: [
      {
        id: "Global",
        value: "Global",
        label: "Global",
      },
    ],
    required: true,
  },
  {
    id: "websiteTerms",
    question:
      "What are the terms of use for your website or application, if applicable? What kind of content do you allow users to upload?",
    type: "text",
    placeholder: "Enter your website terms",
    dummyAnswer: "Our website terms are...",
    required: false,
  },
  {
    id: "paymentTerms",
    question:
      "What are your payment terms? Do you accept refunds or returns, and if so, under what conditions?",
    type: "text",
    placeholder: "Enter your payment terms",
    dummyAnswer:
      "We offer refunds within 30 days of purchase and cancellations can be made up to 24 hours before the scheduled service.",
    required: false,
  },
];
interface FormValues {
  [key: string]: string;
}

const TermsAndConditionsForm = (): JSX.Element => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [showDummyAnswer, setShowDummyAnswer] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(formValues);
  };

  const handleShowDummyAnswer = (question: Question) => {
    setSelectedQuestion(question);
    setShowDummyAnswer(true);
  };

  const handleCloseDummyAnswer = () => {
    setSelectedQuestion(null);
    setShowDummyAnswer(false);
  };

  return (
    <form className="bg-gray-100 p-6 mx-auto w-full max-w-md rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Terms and Conditions Form
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {questionList.map((question: Question, index: number) => (
          <div key={question.id}>
            <label
              htmlFor={question.id}
              className="text-sm font-semibold text-gray-700"
            >
              {index + 1}. {question.question} {question.type}
              {question.required && <span className="text-red-500">*</span>}
            </label>

            {question.type === "text" ? (
              <input
                type="text"
                name={question.id}
                id={question.id}
                placeholder={question.placeholder}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formValues[question.id] ?? ""}
                onChange={handleInputChange}
                required={question.required}
              />
            ) : (
              <div className="flex flex-col space-y-2 mt-1">
                {question.options?.map((option) => (
                  <label
                    key={option.id}
                    className="inline-flex items-center text-sm font-medium text-gray-700"
                  >
                    <input
                      type={question.type}
                      name={question.id}
                      id={option.id}
                      value={option.value}
                      className="form-radio h-4 w-4 text-blue-500"
                      checked={formValues[question.id] === option.value}
                      onChange={handleInputChange}
                      required={question.required}
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}

                {question.type !== "textarea" && (
                  <input
                    type="text"
                    name={`${question.id}-custom`}
                    id={`${question.id}-custom`}
                    placeholder="Enter your custom answer"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={formValues[`${question.id}-custom`] ?? ""}
                    onChange={handleInputChange}
                    required={
                      question.required &&
                      !formValues[question.id] &&
                      !formValues[`${question.id}-custom`]
                    }
                  />
                )}
              </div>
            )}

            <motion.button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
              onClick={() => handleShowDummyAnswer(question)}
              whileHover={{ scale: 1.05 }}
            >
              See example answer
            </motion.button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>

      {selectedQuestion && (
        <Modal isOpen={showDummyAnswer} onClose={handleCloseDummyAnswer}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Dialog.Title className="text-lg font-bold text-gray-900 mb-2">
              Dummy Answer for {selectedQuestion.question}
            </Dialog.Title>
            <Dialog.Description className="text-gray-700 mb-4">
              {selectedQuestion.dummyAnswer}
            </Dialog.Description>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCloseDummyAnswer}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </form>
  );
};

export default TermsAndConditionsForm;
