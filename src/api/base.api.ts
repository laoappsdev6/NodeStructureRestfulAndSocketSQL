import { Request } from '../servers/Request'
import { Response } from '../servers/Response'
import { EMsg, EStatus } from '../services/message'
import { EObject } from '../services/object'
import { Service } from '../services/services'
import { LoginApi } from './login.api'
import { UserApi } from './user.api'

export class BaseApi {

    public static checkObject(obj: Request): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            if (!Service.validateToken(obj.token) && obj.object !== EObject.login) {
                resolve(Service.getRes([], EMsg.noAuthorize, EStatus.fail))
            } else {

                switch (obj.object) {
                    case EObject.login:
                        resolve(LoginApi.checkMethod(obj))
                        break;
                    case EObject.user:
                        resolve(UserApi.checkMethod(obj))
                        break;
                    default:
                        resolve(Service.getRes([], EMsg.objectNotFound, EStatus.fail))
                        break;
                }
            }
        })
    }
}