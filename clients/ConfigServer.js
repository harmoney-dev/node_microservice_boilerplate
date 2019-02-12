
/**
 * The Spring Cloud Configuration client to get the configuration values for this service
 * once attached, @var service_configuration contains the values in the form key:value
 */
const config_server_client = require("cloud-config-client");

var service_configuration = [];

module.exports = {
    loadConfig : () => {
        config_server_client.load({
            name: "email-verification-athena-preprod"
        }).then((config) => {
            // Look for a key
            //const cxf_path_property = config.get("cxf.path");
            config.forEach((key, value) =>
                service_configuration.push({ key: value })
            );
            // Using a prefix, this is equivalent to .get("this.is.another.key");
            //const value2 = config.get("this.is", "another.key");
        }).catch(error => {
            console.log(error);
        });
    },
    service_configuration
}

