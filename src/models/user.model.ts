import { isEmpty, isNumber } from './validate.model';
export class UserModel {
    id: number;
    name: string;
    username: string;
    password: string;
    phonenumber: string;
    remark: string;

    page: number;
    limit: number;

    constructor(data: object) {
        Object.assign(this, data);
    }

    public validateAll(isAdd = true, isUpdate = false, isDelete = false): string {

        if (isUpdate || isDelete) {
            if (typeof this.id !== 'number') {
                return isNumber("id")
            }
        }
        if (isAdd || isUpdate) {
            if (!this.name) {
                return isEmpty("name")
            }
            if (!this.username) {
                return isEmpty("username")
            }
            if (!this.password) {
                return isEmpty("password")
            }
            if (!this.phonenumber) {
                return isEmpty("phonenumber")
            }
        }

        return "true";
    }
}
