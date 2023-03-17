import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../envirorments/envirorments";

export class BaseService {

    apiUrl:string;
    headers;

    constructor(protected _http: HttpClient) { 
      this.apiUrl = environment.baseApiUrl;
      this.headers = new HttpHeaders().set('Content-Type','application/json');    
    }
  
}