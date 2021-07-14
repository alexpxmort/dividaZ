  /**
 *Parte com metodos de CRUD que comunica com a api em JsonPlaceHolder e Api da provadev
 * 
 */

 import axios from 'axios'
 
 export const createReq = (url)=>(
    axios.create({
        baseURL: url, 
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          }
        ,
        validateStatus: (status) => status < 500
      })
      
  );
 const TOKEN = 'b824fbf1-961a-4f7c-b56d-ad4b1a2918ea';

 const request = {
    "URL_DEV":`https://provadev.xlab.digital/api/v1`,
    "URL_USERS":`https://jsonplaceholder.typicode.com/`
}

let api = createReq(request.URL_DEV);
let apiUsers = createReq(request.URL_USERS);



export const createMethod = async (data)=>{

  const resp = await api.post(`/divida/?uuid=${TOKEN}`,
  data
 );

 return resp.data;

}

export const getUsers = async() => {
    const resp = await apiUsers.get(`/users`);

    return await   resp.data;
}

export const updateMethod = async (data,id)=>{
  const resp = await api.put(`/divida/${id}?uuid=${TOKEN}`,
  data
 );

 return resp.data;
}

  export const getAllMethod = async ()=>{
    const resp = await api.get(`/divida?uuid=${TOKEN}`);

   return await resp.data;
    
  };


  export const getByIdMethod = async (id)=>{
    const resp = await api.get(`/divida/${id}?uuid=${TOKEN}`);

    return await resp.data;
  };

  export const deleteMethod = async (id)=>{

    const resp = await api.delete(`/divida/${id}?uuid=${TOKEN}`);

    return resp.data;

  };