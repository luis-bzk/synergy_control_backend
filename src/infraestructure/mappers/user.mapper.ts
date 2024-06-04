import { UserDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { User } from '../../domain/entities';

export class UserMapper {
  static userEntityFromObject(obj: UserDB): User {
    const {
      use_id,
      use_email,
      use_created_date,
      use_name,
      use_last_name,
      use_token,
      use_record_status,
    } = obj;

    if (!use_id)
      throw CustomError.conflict(
        'No se ha recibido el ID del usuario de la Base de Datos',
      );
    if (!use_email)
      throw CustomError.conflict(
        'No se ha recibido el email del usuario de la Base de Datos',
      );
    if (!use_created_date)
      throw CustomError.conflict(
        'No se ha recibido la fecha de creacion del usuario de la Base de Datos',
      );
    if (!use_name)
      throw CustomError.conflict(
        'No se ha recibido el nombre del usuario de la Base de Datos',
      );
    if (!use_last_name)
      throw CustomError.conflict(
        'No se ha recibido el apellido del usuario de la Base de Datos',
      );
    if (!use_record_status)
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del usuario de la Base de Datos',
      );

    return new User({
      id: use_id,
      email: use_email,
      name: use_name,
      last_name: use_last_name,
      password: '',
      token: use_token,
      created_date: use_created_date,
      record_status: use_record_status,
    });
  }

  static userEntityArrayFromObjects(objs: UserDB[]) {
    return objs.map((user) => this.userEntityFromObject(user));
  }
}
