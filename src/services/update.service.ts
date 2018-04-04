import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Version} from "../classes/version";
import {CONST} from "../app/const";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UpdateService {
  latestVersion:Version;
  hasNewVersion:boolean=false;

  constructor(
    private http: HttpClient
  ) {}


  checkUpdate():Promise<boolean>{
    return this.http.get(CONST.ossUrl+`/version.json?t=${Date.now()}`).toPromise().then((data:Version)=>{
      this.latestVersion=data;
      this.hasNewVersion=(
        (this.latestVersion.major > CONST.version.major)||
        (this.latestVersion.major==CONST.version.major&&this.latestVersion.minor>CONST.version.minor)||
        (this.latestVersion.major==CONST.version.major&&this.latestVersion.minor==CONST.version.minor&&(this.latestVersion.patch>CONST.version.patch))
      );
      return this.hasNewVersion;
    });
  }

  get androidDownloadLink(){
    return `${CONST.ossUrl}/apk/zjuLibrary${this.latestVersion.major}.${this.latestVersion.minor}.${this.latestVersion.patch}.apk`;
  }


}
