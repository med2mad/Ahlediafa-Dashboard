import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  username:string='';
  password:string='';
  templatecolor = 'bg-gradient-info';

  ngOnInit() {
    document.getElementById('incorrect').style.display = 'none';
    this.templatecolor = localStorage.getItem('templatecolor');
  }

  async post(){
    const response = await axios.post('http://localhost:5000/user/login/', {"username":this.username, "password":this.password});
    if (response.data.user) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', response.data.user.username)
      localStorage.setItem('photo', response.data.user.photo)
      localStorage.setItem('templatecolor', response.data.user.templatecolor)
      window.location.href = 'http://localhost:4200/#/dashboard'
    }
    else{
        document.getElementById('incorrect').style.display = 'block'
    }
  }

}
