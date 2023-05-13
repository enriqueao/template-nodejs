import { injectable } from "inversify";
import { sql } from "@example-api/config/db";
import { UserRepository } from "@example-api/domain";
import { User } from "src/domain/user/user";

@injectable()
export class UserRepositoryImpl implements UserRepository {

  async create(data: User): Promise<void> {
    const { userName, password } = data;
    await sql({
      query: `
        INSERT INTO
          user_account(usr_act_name, usr_act_password)
        VALUES($1,$2)
      `,
      bind: [userName, password],
    });
  }

  async getUserByUserName(userName: string): Promise<any> {
    const results = await sql({
      query: `
        SELECT
          usr_act_id as "userId",
          usr_act_name as "userName",
          usr_act_password as password
        FROM user_account
        where usr_act_name = $1
      `,
      bind: [userName],
    }) as any;

    if (results.rowCount) {
      return results.rows[0];
    }

    return null;
  }
}
