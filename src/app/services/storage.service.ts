import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { storageKey } from '../const/key';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  public async getSessionToken () {
    let result
    await this.storage.get(storageKey).then(res => result = res)
    return result
  }

  public resetSessionToken()  {
    this.storage.remove(storageKey)
  }

  setSessionToken(sessionToken) {
    this.storage.set(storageKey, sessionToken);
  }

}
