import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalFormDetail, fetchTransaction } from "../store/action";
import { idrCurrency } from "../helpers/currency";

//TODO Chart & wiring

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function FormTransactionModal(props) {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.isModalFormDetail);
  const transaction = useSelector((state) => state.transaction);
  const [price, setPrice] = useState(0);
  const [namePrice, setNamePrice] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(async () => {
    if (props.id) {
      dispatch(fetchTransaction(props.id))
        .then((res) => {
          setPrice(res.amount);
          setNamePrice(idrCurrency(res.amount));
          setName(res.name);
          setFile(res.invoice);
          setDate(res.Date);
          setCategory(res.category);
        })
        .catch((err) => console.log(err));
      // setPrice(transaction.amount);
      // setName(transaction.name);
      // setFile(transaction.invoice);
      // setDate(transaction.Date);
      // setCategory(transaction.category);
    }
  }, [props.id]);

  console.log(props.id, "di modal");
  console.log(transaction);
  console.log(name, "name usestate");

  const closeModal = () => {
    dispatch(toggleModalFormDetail(false));
  };

  const priceHandler = (priceValue) => {
    setPrice(priceValue);
    setNamePrice(idrCurrency(priceValue));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(price);
    // console.log(name);
    console.log(file);
    // console.log(date);
    // console.log(category);

    //TODO
    //* add edit pake props
    //* get budgetId from routeParam
    //* get userName from budgetDetail
    //* get access token for header

    // const formData = new FormData();
    // formData.append("invoice", file);
    // header: access token
    // body: name, amount, date, invoice, category(selectoption), budgetId(routeparams), userName(getDateBudget)
    // axios.post("api/uploadfile", formData);
  };

  return (
    <>
      <Modal
        isOpen={isModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add & Edit Modal"
        ariaHideApp={false}
      >
        <div className="w-96 h-96">
          <form className="mt-5" onSubmit={(e) => submitHandler(e)}>
            <div className="w-full mb-3 space-y-2 text-xs">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="py-2 font-semibold text-gray-600">
                  Transaction Name
                </label>
                <input
                  type="text"
                  placeholder="Alat kantor"
                  className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-row w-full text-xs md:flex md:space-x-4">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 font-semibold text-gray-600">
                  Price Amount
                </label>
                <input
                  type="number"
                  placeholder="50000"
                  className="w-1/2 h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={price}
                  onChange={(e) => priceHandler(e.target.value)}
                />
                <label className="py-2 ml-2 font-semibold text-gray-600">
                  {namePrice}
                </label>
              </div>
            </div>

            <div className="flex-row w-full text-xs md:flex md:space-x-4">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 font-semibold text-gray-600">
                  Date
                </label>
                <input
                  type="date"
                  placeholder=""
                  className="w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 font-semibold text-gray-600">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" selected disabled>
                    --SELECT CATEGORY--
                  </option>
                  <option value="1">Belanja</option>
                  <option value="2">Alat kantor</option>
                  <option value="3">Operasional</option>
                  <option value="4">Lain-lain</option>
                </select>
              </div>
            </div>

            <div className="w-full mb-3 space-y-2 text-xs">
              <label className="py-2 font-semibold text-gray-600 ">
                Invoice
              </label>
              <div className="relative flex flex-wrap items-stretch w-full mb-4">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <div className="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
              <button
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-green-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
