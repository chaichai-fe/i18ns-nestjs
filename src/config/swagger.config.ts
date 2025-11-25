import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

interface SwaggerConfigOptions {
  title?: string
  description?: string
  version?: string
  path?: string
  tags?: string[]
}

export function setupSwagger(
  app: INestApplication,
  options: SwaggerConfigOptions = {},
) {
  const {
    title = 'Translation API',
    description = 'Translation API description',
    version = '1.0',
    path = 'swagger',
  } = options

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'JWT Token, format: Bearer <token>',
        in: 'header',
      },
      'access-token',
    )

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config.build())
  const theme = new SwaggerTheme()
  const swaggerOptions = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.MUTED),
  }

  SwaggerModule.setup(path, app, documentFactory, swaggerOptions)
}
