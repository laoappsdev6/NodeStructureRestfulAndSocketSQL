import { UserController } from "../controllers/user.controller";
import { EUserMethod } from "../services/method";
import { Request } from '../servers/Request'
import { Response } from '../servers/Response'
import { UserModel } from "../models/user.model";
import { EMsg, EStatus } from "../services/message";
import { Service } from "../services/services";

export class UserApi {

    public static checkMethod(obj: Request): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            if (Object.keys(obj.data).length === 0 && obj.method !== EUserMethod.listAll) {
                resolve(Service.getRes([], EMsg.objEmpty, EStatus.fail));

            } else {

                const userModel = new UserModel(obj.data);

                switch (obj.method) {
                    case EUserMethod.add:
                        const validateAdd = userModel.validateAll();
                        validateAdd == "true" ? resolve(UserController.add(userModel)) : resolve(Service.getRes([], validateAdd, EStatus.fail))
                        break
                    case EUserMethod.update:
                        const validateUpdate = userModel.validateAll(false, true);
                        validateUpdate == "true" ? resolve(UserController.update(userModel)) : resolve(Service.getRes([], validateUpdate, EStatus.fail))
                        break
                    case EUserMethod.delete:
                        const validateDelete = userModel.validateAll(false, false, true);
                        validateDelete == "true" ? resolve(UserController.delete(userModel)) : resolve(Service.getRes([], validateDelete, EStatus.fail))
                        break;
                    case EUserMethod.listOne:
                        resolve(UserController.listOne(userModel))
                        break;
                    case EUserMethod.listAll:
                        resolve(UserController.listAll())
                        break;
                    case EUserMethod.listPage:
                        resolve(UserController.listPage(userModel))
                        break;
                    default:
                        resolve(Service.getRes([], EMsg.methodNotFound, EStatus.fail))
                        break;
                }
            }
        })
    }
}