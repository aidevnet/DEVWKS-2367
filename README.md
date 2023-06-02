## Cisco Catalyst SD-WAN

The Cisco Catalyst SD-WAN Solution is a cloud-delivered overlay WAN architecture that facilitates digital and cloud transformation for enterprises. It significantly reduces WAN costs and time to deploy new services.

Cisco Catalyst SD-WAN builds a robust security architecture that's crucial for hybrid networks. It provides a strong policy framework.

The solution has been deployed in every major industry. It solves many critical enterprise problems, including:

* Establishing transport-independent WAN for lower cost and higher diversity
* Meeting SLA for business-critical and real-time applications
* Providing end-to-end segmentation for protecting critical enterprise compute resources
* Extending seamlessly into the public cloud
* Providing optimal user experience for SaaS applications

## Project SD-WAN MSP dashboard

The goal of this project is to provide a one pane of glass application to Cisco Catalyst SD-WAN users and enterprises with particularly MSPs (Managed Service Providers) in mind. The application gives users visibility into the status of their Cisco Catalyst SD-WAN fabric. It has two components: a Python based back-end REST API that interacts with the vManage REST API and a React based front-end that displays the data to the user. The back-end acts as a middleware between the single tenant vManage instances and the front-end. The front-end part of the application interacts with the back-end REST API and gives the users a similar interface to the one vManage has for multi-tenant environments.

Users of the application can monitor with this application:

* Control plane status
* Site health
* WAN edge health
* vSmart status

## Requirements

To use this application you will need:

* Docker 18.06+
* Cisco Catalyst SD-WAN single tenant fabrics

## Install and setup

After you have downloaded the application and unarchived it, navigate to the project folder and issue the following commands that will update and initialize both the front-end and back-end components:

```
docker-compose build --no-cache
docker-compose up
```

You can access the dashboard by default at `localhost:8671`.

### Exposing dashboard on the internet

You can change where the front-end runs using `package.json`. However, the back-end REST API is restricted to only allow CORS from `localhost` (any port) by default.

If you're exposing the front-end over the internet, you'll probably want to first execute `npm run production` to access static files in the `dist` folder, then change the following in the back-end `swagger_server/app.py`:

```py
CORS(app.app, resources={
    r"*": {"origins": "http://{YOUR_IP}"}
})
```

If you change where the back-end runs, you can easily let the front-end find it by changing the following in `config/env/dev.json`:

```js
"config": {
    "BASENAME": "sd-wan-msp-demo",
    "API_SERVER": "http://{YOUR_IP}"
}
```
