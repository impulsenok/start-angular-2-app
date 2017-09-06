const nconf = require('nconf');
const yaml = require('nconf-yaml');
nconf.formats.yaml = yaml;

let fs = require('fs'),
    path = require('path'),
    environment = process.env.NODE_ENV || 'development',
    country = process.env.NODE_COUNTRY || 'tg';

    baseConfigPath = path.join(__dirname, 'config.yaml'),
    envConfigPath = path.join(__dirname, `config.${environment}.yaml`),
    countryConfigPath = path.join(__dirname, `config.${country}.yaml`),
    envCountryConfigPath = path.join(__dirname, `config.${environment}.${country}.yaml`),
    localConfigPath = path.join(__dirname, `config.${environment}.local.yaml`),

    hasBaseConfig = fs.existsSync(baseConfigPath),
    hasEnvConfig = fs.existsSync(envConfigPath),
    hasCountryConfig = fs.existsSync(countryConfigPath),
    hasEnvCountryConfig = fs.existsSync(envCountryConfigPath),
    hasLocalConfig = fs.existsSync(localConfigPath);

if (!hasBaseConfig && !hasEnvConfig && !hasCountryConfig && !hasEnvCountryConfig) {
    throw new Error('Could not find "' + envConfigPath + ' or ' + baseConfigPath + ' or ' + hasCountryConfig + ' or ' + hasEnvCountryConfig + '".');
}

nconf.argv();

if (hasLocalConfig) {
    nconf.file('local', {
        file: localConfigPath,
        format: yaml,
        search: true
    });
}

if (hasEnvCountryConfig) {
    nconf.file('envCountry', {
        file: envCountryConfigPath,
        format: yaml,
        search: true
    });
}


if (hasEnvConfig) {
    nconf.file('environment', {
        file: envConfigPath,
        format: yaml,
        search: true
    });
}

if (hasCountryConfig) {
    nconf.file('country', {
        file: countryConfigPath,
        format: yaml,
        search: true
    });
}

if (hasBaseConfig) {
    nconf.file('base', {
        file: baseConfigPath,
        format: yaml,
        search: true
    });
}

module.exports = nconf;
