import { UserModel } from '../models/user.model';
import { Service } from '../services/services';
import { Databases } from './databases.controller';
import { ValidateController } from './validate.controller';
import { Response } from '../servers/Response';
import { already } from '../models/validate.model';

export class UserController {

    public static add(data: UserModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const sqlUsername = `select * from users where username='${data.username}'`;
            ValidateController.alreadyExist(sqlUsername).then((result) => {

                if (result) {
                    const msg = already("username", data.username);
                    resolve(Service.getRes([], msg, 0));

                } else {
                    const sql = `insert into users (name,username,password,phonenumber,remark)
                             values ('${data.name}','${data.username}','${data.password}','${data.phonenumber}','${data.remark}')`;
                    Databases.insert(sql).then(result => {
                        resolve(result)
                    });
                }
            })
        })
    }

    public static update(data: UserModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const sqlUsername = `select * from users where username='${data.username}' and id!='${data.id}'`;
            ValidateController.alreadyExist(sqlUsername).then((result) => {

                if (result) {
                    const msg = already("username", data.username);
                    resolve(Service.getRes([], msg, 0));

                } else {
                    const sql = `update users set name='${data.name}', username='${data.username}', password='${data.password}',
                            phonenumber='${data.phonenumber}',remark='${data.remark}' where id='${data.id}'`;

                    Databases.update(sql).then(result => {
                        resolve(result)
                    });
                }
            });
        })
    }

    public static delete(data: UserModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const sql = `delete from users where id='${data.id}'`;
            Databases.delete(sql).then(result => {
                resolve(result)
            });
        })
    }
    public static listOne(data: UserModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const sql = `select * from users where id = ${data.id}`;
            Databases.selectOne(sql).then(result => {
                resolve(result)
            });
        })
    }

    public static listAll(): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const sql = `select * from users order by id desc`;
            Databases.selectAll(sql).then(result => {
                resolve(result)
            });
        })

    }

    public static listPage(data: UserModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {

            const page = data.page ? data.page : 1;
            const limit = data.limit ? data.limit : 10;
            const offset = (page - 1) * limit;

            const sqlCount = "select count(*) as count from users";
            const sqlPage = `select * from users order by id desc limit ${limit} offset ${offset} `;

            Databases.selectPage(sqlCount, sqlPage).then(result => {
                resolve(result)
            });
        })
    }
}
