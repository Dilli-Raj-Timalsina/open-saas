import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface LoggingModuleOptions {
  level: 'debug' | 'info' | 'warn' | 'error';
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: LOGGING_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<LoggingModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

/**
Custom method key
ConfigurableModuleClass by default provides the register and its counterpart registerAsync methods. To use a different method name, use the ConfigurableModuleBuilder#setClassMethodName method, as follows:



export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
new ConfigurableModuleBuilder<ConfigModuleOptions>().setClassMethodName('forRoot').build();

 */

/**
 * 
Extra options
There are edge-cases when your module may need to take extra options that determine how it is supposed to behave (a nice example of such an option is the isGlobal flag - or just global) that at the same time, shouldn't be included in the MODULE_OPTIONS_TOKEN provider (as they are irrelevant to services/providers registered within that module, for example, ConfigService does not need to know whether its host module is registered as a global module).

In such cases, the ConfigurableModuleBuilder#setExtras method can be used. See the following example:


export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<ConfigModuleOptions>()
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();

 */

/**
Extending auto-generated methods
The auto-generated static methods (register, registerAsync, etc.) can be extended if needed, as follows:

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.register(options),
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.registerAsync(options),
    };
  }
}
 */

/**
 
Note the use of OPTIONS_TYPE and ASYNC_OPTIONS_TYPE types that must be exported from the module definition file:

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } = new ConfigurableModuleBuilder<ConfigModuleOptions>().build();

 */
