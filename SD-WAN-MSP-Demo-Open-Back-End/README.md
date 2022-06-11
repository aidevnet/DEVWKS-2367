## Cisco SD-WAN powered by Viptela

The Cisco SD-WAN Solution is a cloud-delivered overlay WAN architecture that facilitates digital and cloud transformation for enterprises. It significantly reduces WAN costs and time to deploy new services.

Cisco SD-WAN builds a robust security architecture that's crucial for hybrid networks. It provides a strong policy framework.

The solution has been deployed in every major industry. It solves many critical enterprise problems, including:

* Establishing transport-independent WAN for lower cost and higher diversity
* Meeting SLA for business-critical and real-time applications
* Providing end-to-end segmentation for protecting critical enterprise compute resources
* Extending seamlessly into the public cloud
* Providing optimal user experience for SaaS applications

## Project SD-WAN MSP dashboard

The goal of this project is to provide a one pane of glass application to Cisco SD-WAN users and enterprises with particularly MSPs (Managed Service Providers) in mind. The application gives users
visibility into the status of their Cisco SD-WAN fabric. It has two components: a Python based backend REST API that interacts with the vManage REST API and a React based front-end that displays
the data to the user. The backend acts as a middleware between the single tenant vManage instances and the front-end. The front-end part of the application interacts with the backend REST API and
gives the users a similar interface to the one vManage has for multi tenant environments.

Users of the application can monitor with this application:
* Control plane status
* Site health
* WAN edge health
* vSmart status

## Requirements

To use this application you will need:
* Docker 18.06+
* Cisco SD-WAN single tenant fabrics

## Install and setup

After you have downloaded the application and unarchived it, change directory to `backend` and build the Docker application:

  `docker build -t app .`

This will build your Docker environment and install all the requirements. Next you can run the backend application with the following command:

  `docker run -p 8080:8080 app`

You can access the backend REST API at `localhost:8080/v1/ui`.
