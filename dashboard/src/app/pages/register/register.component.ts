import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  username:string='';
  password1:string='';
  password2:string='';
  templatecolor = 'bg-gradient-info';

  ngOnInit() {
    document.getElementById('required').style.display = 'none';
    document.getElementById('notmatch').style.display = 'none';
    document.getElementById('exists').style.display = 'none';
    document.getElementById('lengthusername').style.display = 'none';
    document.getElementById('lengthpass').style.display = 'none';

    this.templatecolor = localStorage.getItem('templatecolor');
  }

  post(){
    if (!this.username.trim() || !this.password1.trim() || !this.password2.trim())
    {document.getElementById('required').style.display = 'block'}
    else if(this.password1.trim() != this.password2.trim())
    {document.getElementById('notmatch').style.display = 'block'}
    else if(this.username.trim().length>10 || this.username.trim().length<5)
    {document.getElementById('lengthusername').style.display = 'block'}
    else if(this.password1.trim().length>10 || this.password1.trim().length<5)
    {document.getElementById('lengthpass').style.display = 'block'}
    else
    {
      const payload = new FormData(document.getElementById("frmid") as HTMLFormElement);
      axios.post('http://localhost:5000/user/signup', payload)
      .then((response) => { 
        if(response.data=='exists'){document.getElementById('exists').style.display = 'block'}
        else{
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('photo', response.data.photo);
          document.getElementById('exists').style.display = 'none';
          window.location.href = 'http://localhost:4200/#/dashboard';
        }
      })
    }
  }
  
}
