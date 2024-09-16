import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
})
export class ChangepassComponent implements OnInit {

  password:string='';
  password1:string='';
  password2:string='';
  templatecolor = 'bg-gradient-info';

  ngOnInit() {
    document.getElementById('required').style.display = 'none'
    document.getElementById('notmatch').style.display = 'none'
    document.getElementById('length').style.display = 'none'

    this.templatecolor = localStorage.getItem('templatecolor');
  }

  put(){
    if (!this.password.trim() || !this.password1.trim() || !this.password2.trim())
    {document.getElementById('required').style.display = 'block'}
    else if(this.password1.trim().length>10 || this.password1.trim().length<5)
    {document.getElementById('length').style.display = 'block'}
    else if(this.password1.trim() != this.password2.trim())
    {document.getElementById('notmatch').style.display = 'block'}
    else
    {
      const payload = new FormData(document.getElementById("frmid") as HTMLFormElement);
      payload.append('token', localStorage.getItem('token'))
      payload.append('username', localStorage.getItem('username'))
      axios.put('http://localhost:5000/user/password', payload)
      .then((response) => { 
        if(response.data){
          localStorage.setItem('token', response.data.token);
          window.location.href = 'http://localhost:4200/#/dashboard';
        }
        else{
          Swal.fire( {title:'Infos Utilisateur Incorrect', animation:false, icon:"error"})
        }
      })
    }
  }
  
}
