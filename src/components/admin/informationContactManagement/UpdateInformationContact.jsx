import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getInformationContactById, updateInformationContact } from "../../../api/informationContactApi";
import AdminNavigation from "../AdminNavigation";
import { useEffect } from "react";

const UpdateInformationContact = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const { idInformation } = useParams();
  
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  
  const queryClient = useQueryClient();


  // Récupération des données 
  useQuery({
    queryKey: ['information', idInformation],
    queryFn: () => getInformationContactById(idInformation),
    onSuccess: (data) => {
      if(data) {
        setMobile(data.mobile || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const mutation = useMutation({
    mutationFn: updateInformationContact,
    onSuccess: (data) => {
      queryClient.invalidateQueries('information');
      if(data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      idInformation,
      mobile,
      email,
      address
    });
  }

  return (
    <div className="navigation-and-content">
    <AdminNavigation/>
    <div className="content-wrapper">
    <h2>Modifier l&apos;information de contact</h2>
    <form onSubmit={handleSubmit} className='form'>

      <label htmlFor="mobile">Numéro de téléphone</label>
      <input
        type="text"
        name="mobile"
        value={mobile}
        id="mobile"
        onChange={(e) => setMobile(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="address">Adresse</label>
      <input
        type="text"
        name="address"
        value={address}
        id="address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <button type="submit" disabled={mutation.isLoading}>Mettre à jour</button>
    </form>
  </div>
  </div>
  );
};

export default UpdateInformationContact;