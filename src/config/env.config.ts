export const EnvConfiguracion = () => ({
    // Configuración de variables de entorno
    environment : process.env.NODE_ENV || 'development',
    mongodb : process.env.MONGODB,
    port : process.env.PORT || 3001,
    defaultLimit : process.env.DEFAULT_LIMIT || 10,
    jwtSecret : process.env.JWT_SECRET || 'default'

});