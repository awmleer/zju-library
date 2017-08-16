import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Version} from "../classes/version";
import {CONFIG} from "../app/config";

@Injectable()
export class UpdateService {
  latestVersion:Version;
  hasNewVersion:boolean=false;

  constructor(
    private http: Http
  ) {}

  checkUpdate():Promise<boolean>{
    return this.http.get(CONFIG.ossUrl+'/version.json').toPromise().then((response:Response)=>{
      this.latestVersion=response.json();
      console.log(this.latestVersion);
      this.hasNewVersion=(
        (this.latestVersion.major > CONFIG.version.major)||
        (this.latestVersion.major==CONFIG.version.major&&this.latestVersion.minor>CONFIG.version.minor)||
        (this.latestVersion.major==CONFIG.version.major&&this.latestVersion.minor==CONFIG.version.minor&&(this.latestVersion.patch>CONFIG.version.patch))
      );
      return this.hasNewVersion;
    });
  }


}
