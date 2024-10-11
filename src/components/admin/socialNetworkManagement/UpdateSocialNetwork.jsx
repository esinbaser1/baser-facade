import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSocialNetworkById, updateSocialNetwork } from "../../../api/socialNetworkApi";
import { toast } from 'react-toastify';
import AdminNavigation from "../AdminNavigation";

const UpdateSocialNetwork = () => {

  const {idSocialNetwork} = useParams();

  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();


  // Récupération des données des réseaux sociaux
  useQuery({
    queryKey: ['socialNetwork', idSocialNetwork],
    queryFn: () => getSocialNetworkById(idSocialNetwork),

    onSuccess: (data) => {
      if(data) {
        setPlatform(data.platform || "");
        setUrl(data.url || "")
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

    // Mutation pour mettre à jour le réseau social
  const mutation = useMutation({
    mutationFn: updateSocialNetwork,
    onSuccess: (data) => {
      console.log(data); 
      queryClient.invalidateQueries('socialNetwork');
      if(data.success)  {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      idSocialNetwork,
      platform,
      url
    })
  }

  return (
    <div className="content-wrapper">
    <AdminNavigation/>
    <h2>Modifier le réseau social</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="platform">Nom du réseau social*</label>
        <input type="text" id="platform"name="platform" value={platform} onChange={(e) => setPlatform(e.target.value)}/>

        <label htmlFor="url">Url*</label>
        <input type="text" id="url"name="url" value={url} onChange={(e) => setUrl(e.target.value)}/>

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateSocialNetwork;