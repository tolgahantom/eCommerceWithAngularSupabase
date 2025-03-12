import { Injectable } from '@angular/core';
import { supabase } from './supabase.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.checkUserSession();
  }

  private async checkUserSession() {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      this.userSubject.next(data.session.user);
    }
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    this.userSubject.next(data.user);
  }

  async register(
    email: string,
    password: string,
    name: string,
    surname: string
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          surname,
        },
      },
    });

    if (error) throw error;
    this.userSubject.next(data.user);
  }

  async logout() {
    await supabase.auth.signOut();
    this.userSubject.next(null);
  }
}
