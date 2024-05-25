import { UserDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { User } from '../../domain/entities';

export class UserMapper {
  static userEntityFromObject(obj: UserDB): User {
    const {
      USE_ID,
      USE_EMAIL,
      USE_CREATED_DATE,
      USE_NAME,
      USE_LAST_NAME,
      USE_TOKEN,
      USE_RECORD_STATUS,
    } = obj;

    if (!USE_ID)
      throw CustomError.conflict(
        'No se ha recibido el ID del usuario de la Base de Datos',
      );
    if (!USE_EMAIL)
      throw CustomError.conflict(
        'No se ha recibido el email del usuario de la Base de Datos',
      );
    if (!USE_CREATED_DATE)
      throw CustomError.conflict(
        'No se ha recibido la fecha de creacion del usuario de la Base de Datos',
      );
    if (!USE_NAME)
      throw CustomError.conflict(
        'No se ha recibido el nombre del usuario de la Base de Datos',
      );
    if (!USE_LAST_NAME)
      throw CustomError.conflict(
        'No se ha recibido el apellido del usuario de la Base de Datos',
      );
    if (!USE_RECORD_STATUS)
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del usuario de la Base de Datos',
      );

    return new User({
      id: USE_ID,
      email: USE_EMAIL,
      name: USE_NAME,
      last_name: USE_LAST_NAME,
      password: '',
      token: USE_TOKEN,
      created_date: USE_CREATED_DATE,
      record_status: USE_RECORD_STATUS,
    });
  }

  static userEntityArrayFromObjects(objs: UserDB[]) {
    return objs.map((user) => this.userEntityFromObject(user));
  }
}
