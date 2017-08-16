import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Version} from "../classes/version";
import {CONST} from "../app/const";

@Injectable()
export class UpdateService {
  latestVersion:Version;
  hasNewVersion:boolean=false;

  constructor(
    private http: Http
  ) {}


  checkUpdate():Promise<boolean>{
    return this.http.get(CONST.ossUrl+'/version.json').toPromise().then((response:Response)=>{
      this.latestVersion=response.json();
      this.hasNewVersion=(
        (this.latestVersion.major > CONST.version.major)||
        (this.latestVersion.major==CONST.version.major&&this.latestVersion.minor>CONST.version.minor)||
        (this.latestVersion.major==CONST.version.major&&this.latestVersion.minor==CONST.version.minor&&(this.latestVersion.patch>CONST.version.patch))
      );
      return this.hasNewVersion;
    });
  }

  get androidDownloadLink(){
    return `http://qiniu.zjulibrary.sparker.top/apk/zjuLibrary${this.latestVersion.major}.${this.latestVersion.minor}.${this.latestVersion.patch}.apk`;
  }


}
