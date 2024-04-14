import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post("http://localhost:3000/sendMail", data);
      toast("Form Sent!", {
        duration: 1000,
        position: "center-bottom",
      });
      // Clear form after submission
      reset(); // Reset form fields
    } catch (error) {
      toast("Error Sending Form!", {
        duration: 1000,
        position: "center-bottom",
      });
      console.error("Error sending from via email", error);
    }
    //refresh after send//
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="text-xl font-bold mb-4">Contact Form</div>
        <div className="border-2 p-4 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {/* First Name */}
              <label className="block text-md font-medium text-gray-700">
                First Name:
                <input
                  {...register("firstName")}
                  className="mt-1 p-1 block w-full text-sm rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div className="mb-4">
              {/* Last Name */}
              <label className="block text-md font-medium text-gray-700">
                Last Name:
                <input
                  {...register("lastName")}
                  className="mt-1 p-1 block w-full text-sm rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div className="mb-4">
              {/* Email */}
              <label className="block text-md font-medium text-gray-700">
                Email:
                <input
                  {...register("email")}
                  type="email"
                  className="mt-1 p-1 block w-full text-sm rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
            </div>
            <div className="mb-4">
              {/* Message */}
              <label className="block text-md font-medium text-gray-700">
                Message:
                <textarea
                  {...register("message")}
                  className="mt-1 p-1 block w-full text-sm rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
