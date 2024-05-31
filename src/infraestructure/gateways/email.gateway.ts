import nodemailer from 'nodemailer';
import { envs } from '../../config';

export class EmailGateway {
  constructor() {}

  static async sendEmailVerifyAccount({
    email,
    name,
    lastName,
    token,
  }: {
    email: string;
    name: string;
    lastName: string;
    token: string;
  }): Promise<{}> {
    const transport = nodemailer.createTransport({
      host: envs.SMTP_HOST,
      port: Number(envs.SMTP_PORT),
      auth: {
        user: envs.SMTP_USER,
        pass: envs.SMTP_PASS,
      },
    });

    await transport.sendMail({
      from: 'Iyai <gsgroup@gmail.com>',
      to: email,
      subject: 'Synergy Control - Confirma tu cuenta',
      text: 'Valida tu dirección email para acceder a tu cuenta por completo',
      html: `
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Iyai - Confirma tu cuenta</title>
          <style>
            body {
              background-color: #f6f6f6;
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #334155;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              transform: translateY(50%);
      
              display: flex;
              flex-direction: column;
              gap: 20px;
              align-items: center;
            }
            h1 {
              text-align: center;
              color: #059669;
              margin-top: 0;
            }
            p {
              margin: 0;
            }
            a {
              all: unset;
            }
            .center_text {
              text-align: center;
              margin-bottom: 10px;
            }
            .button {
              all: unset;
              cursor: pointer;
              display: inline-block;
              padding: 10px 20px;
      
              background-color: #10b981;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: 0.2s;
      
              &:hover {
                background-color: #059669;
              }
            }
      
            .content {
              text-align: justify;
              line-height: 24px;
            }
      
            .alert_message {
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Te damos la bienvenida a Synergy Control 👋</h1>
      
            <div>
              <p class="center_text">Hola ${name} ${lastName}</p>
              <p class="center_text">
                Confirma tu dirección de correo para completar tu registro:
              </p>
            </div>
      
            <a href="${envs.FRONTEND_URL}/auth/verify/${token}">
              <button class="button">
                Confirmar mi dirección de correo electrónico
              </button>
            </a>
      
            <p class="content">
              SynergyControl es mucho más que un simple sistema; es la solución
              definitiva para facilitar y optimizar todas las operaciones de tu
              empresa. Con una interfaz intuitiva y poderosas capacidades, nuestra
              plataforma te permite crear productos, gestionar inventarios, realizar
              ventas, fidelizar clientes, administrar empleados, crear tareas,
              controlar datos, generar informes, gestionar facturación y mucho más,
              todo en un solo lugar.
            </p>
      
            <p class="alert_message">
              Si no creaste esta cuenta, por favor ignora este correo electrónico.
            </p>
          </div>
        </body>
      </html>
      `,
    });

    return {};
  }

  static async sendEmailRecoverPassword({
    email,
    name,
    lastName,
    token,
  }: {
    email: string;
    name: string;
    lastName: string;
    token: string;
  }): Promise<{}> {
    const transport = nodemailer.createTransport({
      host: envs.SMTP_HOST,
      port: Number(envs.SMTP_PORT),
      auth: {
        user: envs.SMTP_USER,
        pass: envs.SMTP_PASS,
      },
    });

    await transport.sendMail({
      from: 'Iyai <gsgroup@gmail.com>',
      to: email,
      subject: 'Iyai - Recuperar mi cuenta',
      text: 'Recupera el acceso a tu cuenta',
      html: `
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Iyai - Confirma tu cuenta</title>
          <style>
            body {
              background-color: #f6f6f6;
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #334155;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              transform: translateY(50%);
      
              display: flex;
              flex-direction: column;
              gap: 20px;
              align-items: center;
            }
            h1 {
              text-align: center;
              color: #059669;
              margin-top: 0;
            }
            p {
              margin: 0;
            }
            a {
              all: unset;
            }
            .center_text {
              text-align: center;
              margin-bottom: 10px;
            }
            .button {
              all: unset;
              cursor: pointer;
              display: inline-block;
              padding: 10px 20px;
      
              background-color: #10b981;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: 0.2s;
      
              &:hover {
                background-color: #059669;
              }
            }
      
            .content {
              text-align: justify;
              line-height: 24px;
            }
      
            .alert_message {
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Cambiar mi contraseña 🙈</h1>
      
            <div>
              <p class="center_text">Hola ${name} ${lastName}</p>
              <p class="center_text">Vamos a recuperar el acceso a tu cuenta</p>
            </div>
      
            <p class="content">
              Nos has solicitado recuperar el acceso a SynergyControl. No te
              preocupes, es muy común.
              <br />
              Para crear una nueva contraseña, haz clic en el siguiente enlace:.
            </p>
      
            <a href="${envs.FRONTEND_URL}/auth/change-password/${token}">
              <button class="button">Cambiar mi contraseña</button>
            </a>
      
            <p class="alert_message">
              Si no solicitaste este cambio de contraseña, por favor ignora este
              correo electrónico.
            </p>
          </div>
        </body>
      </html>
      `,
    });

    return {};
  }
}
