/**
 * This is the Eureka configurator file.
 * @exports init
 *  @description initializes the Eureka client object
 * @exports start
 *  @description starts the link between Eureka server and the client usign a express application.
 *  Loads the configuration from the config server client
 *  @param app the express server which contains all the routing information
 */
const configServer = require('./ConfigServer');
const Eureka = require('eureka-js-client').Eureka;
var eureka_client = '';
// Constants
const PORT = process.env.PORT;
const name_service = process.env.NAME;

var nodeInstance = '';

module.exports = {
    /**
     *
     *
     */
    init : () => {
        console.log(name_service);
        eureka_client = new Eureka({
            // application instance information
            instance: {
                app: name_service,
                hostName: 'localhost',
                ipAddr: '127.0.0.1',
                statusPageUrl: 'http://localhost:3000',
                vipAddress: 'a-node-service',
                port: {
                    $: PORT,
                    '@enabled': 'true',
                },
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                },
                registerWithEureka: true,
                fetchRegistry: true,
            },
            eureka: {
                // eureka server host / port
                host: 'localhost',
                port: 8761,
                servicePath: '/eureka/apps/',
            },
        });
    }
    ,
    start : (app) => {
        return eureka_client.start(
            error => {
                console.log(error || 'NodeJS Eureka Started!');
                // App
                nodeInstance = eureka_client.getInstancesByAppId(name_service);

                console.log(nodeInstance);

                const nodeUrl = `${nodeInstance[0].hostName}:${
                    nodeInstance[0].port.$
                    }/service-instances/${nodeInstance[0].app}`;

                console.log(nodeUrl);

                //LOAD CONFIG (this can be done in any part of the code when necessary)
                config = configServer.loadConfig();

                let router = require('../routes/router');
                router.init(app);
                /* LEAVING THIS FOR FUTURE USAGE
                    app.get(`/serviceInfo/${nodeInstance[0].app}/config`, (req, res) => {
                        res.send(JSON.stringify(configServer.service_config), null, 2);
                        res.end();
                    });
                    // get node service info endpoint
                    //http://localhost:3000/serviceInfo/localhost:3000/service-instances/A-NODE-SERVICE
                    app.get(`/serviceInfo/${nodeUrl}`, (req, res) => {
                        res.send(JSON.stringify(nodeInstance), null, 2);
                        res.end();
                    });
                */
                return app;
            });
    }
}