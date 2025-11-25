import { Module } from '@nestjs/common'
import { LangTagModule } from './langTag/langTag.module'
import { BusinessTagModule } from './businessTag/businessTag.module'
import { TranslationsModule } from './translations/translations.module'
import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller'

@Module({
  imports: [LangTagModule, BusinessTagModule, TranslationsModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
