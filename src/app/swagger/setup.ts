import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as SwaggerUi from 'swagger-ui-express';
import { join } from 'path';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';

interface Request {
  headers: Record<string, string>;
}

// TODO: Hack. Remove when imports will be fixed
const PUBLIC_ASSETS_PATH = join(__dirname, '/public');

const CRYPTO_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';

export const setup = async (app: INestApplication): Promise<void> => {
  const options = new DocumentBuilder().setTitle('Be Rich API').setVersion('1.0').build();

  const path = '/docs';

  const document = SwaggerModule.createDocument(app, options);
  const httpAdapter = app.getHttpAdapter();

  app.use(
    path,
    SwaggerUi.serveFiles(document, {
      swaggerOptions: {
        requestInterceptor: function (request: Request) {
          const keys = JSON.parse(window.localStorage.getItem('apiKeys')) || {};

          if (!keys.accessToken) {
            return request;
          }

          request.headers.authorization = `Bearer ${keys.accessToken}`;

          return request;
        },
      },
    }),
  );

  const swaggerHtml = SwaggerUi.generateHTML(document, {
    customJs:     '/js/script.js',
    customCssUrl: '/css/styles.css',
  });

  const dom = new JSDOM(swaggerHtml);

  const cryptoScriptTag = dom.window.document.createElement('script');
  cryptoScriptTag.src = CRYPTO_CDN_URL;
  dom.window.document.head.appendChild(cryptoScriptTag);

  const headerHtml = readFileSync(join(PUBLIC_ASSETS_PATH, 'html/header.html'));
  dom.window.document.body.insertAdjacentHTML('afterbegin', headerHtml.toString());

  httpAdapter.useStaticAssets(PUBLIC_ASSETS_PATH);
  httpAdapter.get(path, (req, res) => res.send(dom.serialize()));
  httpAdapter.get(path + '-json', (req, res) => res.json(document));
};
