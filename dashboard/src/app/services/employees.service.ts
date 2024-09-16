import axios from 'axios';
import { utils } from 'src/app/services/utils';

export class employeesService {

  static get(page:number, name:string):Promise<any>{
    return axios.get('http://localhost:5000/employee?name='+name+'&skip='+((page-1)*5)+'&limit=5')
  }

  static post(payload:FormData, data:any){
    if (payload.get('name')) {
      payload.append('token', localStorage.getItem('token'));
      axios.post('http://localhost:5000/employee', payload)
      .then((response) => { 
        data.unshift({"id":response.data.newId, "name":payload.get('name'), "phone":payload.get('phone'), "role":payload.get('role'), "photo":response.data.photo, "event":0})
      })
      .catch((err)=>{
        if(err.response && err.response.status == 401){
          utils.logOut()
        }
      })
    }
  }
  
  static put(id:number, payload:FormData, data:any, i:number){
    payload.append('token', localStorage.getItem('token'));
    axios.put('http://localhost:5000/employee/'+id, payload)
    .then((response) => { 
      data[i].name = payload.get('name'); data[i].phone = payload.get('phone');
      data[i].role = payload.get('role'); data[i].photo = response.data.photo;
    })
    .catch((err)=>{
      if(err.response && err.response.status == 401){
        utils.logOut()
      }
    })
  }

  static delete(id:number, data:any, i:number){
    const payload = new FormData()
    payload.append('token', localStorage.getItem('token'));
    axios.delete('http://localhost:5000/employee/'+id, { data: payload })
    .then(()=>{
      data.splice(i,1)
    })
    .catch((err)=>{
      if(err.response && err.response.status == 401){
        utils.logOut()
      }
    })
  }

}