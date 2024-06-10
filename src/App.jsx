import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { IoSearch } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const [isOpen, setOpen] = useState(false); //for operating the modal

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactSnapshot = await getDocs(contactsRef);
        const contactLists = contactSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex relative items-center flex-grow ">
          <IoSearch className="text-white text-3xl absolute ml-1 " />
          <input
            type="text"
            className=" flex-grow h-10 border border-white bg-transparent rounded-md text-white pl-10"
          />
        </div>
        <IoAddCircleOutline onClick={onOpen} className="flex text-white text-5xl cursor-pointer" />
      </div>
      <div>
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
        <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
    </>
  );
}

export default App;
